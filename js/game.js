let yourTurn = false;
let firstRender = true;
let waiting = "Finding an opponent";
let attacker = null;
let taunt = false;


const state = () => {
  fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle
    method: "POST",       // l’API (games/state)
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // contient les cartes/état du jeu.

      if (data === "LAST_GAME_LOST") {
        showError(data);
        setTimeout(function () {
          window.location.href = "lobby.php";
        }, 2000);
      }
      else if (data != "WAITING") {
        document.querySelector(".waiting").style.display = "none";
        renderGame(data);
        yourTurn = data.yourTurn;
      }
      else if (data === "WAITING") {
        waitingDiv = document.querySelector(".waiting");
        if (document.querySelector(".waiting").style.display == "") {
          document.querySelector(".waiting").style.display = "flex";
        }
        document.querySelector(".waiting").innerHTML = waiting;
        if (waiting == "Finding an opponent...") {
          waiting = "Finding an opponent";
        }
        else {
          waiting = waiting + ".";
        }
      }

      setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

function action(action, uid, target) {
  if (yourTurn) {
    formData = new FormData();
    formData.append("action", action);
    if (uid != null) {
      formData.append("uid", uid);
    }
    if (target != null) {
      formData.append("targetuid", target);
    }

    fetch("ajax-state.php", {
      method: "POST",
      credentials: "include",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log("QUE", data);
        if (typeof data != "string") {
          renderGame(data);
        }
        else {
          showError(data);
        }
      })
  }
  else {
    showError("WRONG_TURN");
  }
}

// let lastActionId = 0; // Tracker la derniere action

const renderGame = (data) => {
  if (firstRender) {
    document.querySelector(".opponent-class-frame").style.background = `url(images/class/${data.opponent.heroClass}.jpg)`;
    document.querySelector(".opponent-class-frame").style.backgroundSize = "cover";
    firstRender = false;
  }
  //Render static fields
  document.querySelector(".timer").innerHTML = data.remainingTurnTime;

  renderOpponent(data);
  renderOpponentBoard(data);
  renderPlayerBoard(data);
  renderPlayer(data);

  //Opponent Stats
  document.querySelector(".opponent-hp").innerHTML = data.opponent.hp
  document.querySelector(".opponent-mp").innerHTML = data.opponent.mp
  document.querySelector(".opponent-cards").innerHTML = data.opponent.remainingCardsCount;

}

function renderPlayer(data) {
  const playerHp = document.querySelector(".info-hp");
  const playerMp = document.querySelector(".info-mp");
  const playerCardsCount = document.querySelector(".info-cards");
  const hand = document.querySelector(".hand");

  // Affichage des stats du joueur
  playerHp.innerHTML = data.hp;
  playerMp.innerHTML = data.mp;
  playerCardsCount.innerHTML = data.remainingCardsCount;

  // Supprimer carte dans la main
  while (hand.firstChild) {
    hand.removeChild(hand.firstChild);
  }

  // Ajouter les cartes dans la main
  for (const card of data.hand) {
    const cardDiv = document.createElement("div");
    hand.appendChild(cardDiv);
    cardDiv.outerHTML = genererCarte(card); // Fonction qui inject du HTML dans le div
    
    if (card.cost <= data.mp && yourTurn && data.board.length < 7) {
      cardDiv.style.border = "#a1fbff 2px solid";
    }

    for (element of hand.querySelectorAll(".card-frame")) {
      element.addEventListener('click', (event) => {
        let uid = event.currentTarget.getAttribute("data-uid");
        event.currentTarget.style.border = "solid 4px green"
        action("PLAY", uid);
      });
    }
  }


}

function renderPlayerBoard(data) {
  const board = document.querySelector(".board");

  // Supprimer carte sur le board du joueur
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  // Ajouter les cartes sur le board du joueur
  for (const card of data.board) {
    const cardDiv = document.createElement("div");
    board.appendChild(cardDiv);
    cardDiv.outerHTML = genererCarte(card);

    //Event Listener sur cartes
    cardDiv.addEventListener("click", function () { attack(card.uid, card.state) });
    if (card.state == "SLEEP") {
      cardDiv.style.opacity = "80%";
    }
    if (card.uid == attacker) {
      cardDiv.style.border = "solid #dd5304 2px";
    }
  }

  // for (element of board.querySelectorAll(".card-frame")) {
  //   element.addEventListener('click', (event) => {
  //     let uid = event.currentTarget.getAttribute("data-uid")
  //     event.currentTarget.style.border = "solid 4px green"
  //     cardAction("ATTACK", uid);
  //   });
  // }
}

function renderOpponent(data) {
  const opponentHp = document.querySelector(".opponent-hp");
  const opponentMp = document.querySelector(".opponent-mp");
  const opponentHand = document.querySelector(".opponent-hand");
  const opponentCardsLeft = document.querySelector(".opponent-cards");

  // Affichage des stats de l'adversaire
  opponentHp.innerHTML = data.opponent.hp;
  opponentMp.innerHTML = data.opponent.mp;
  opponentCardsLeft.innerHTML = data.remainingCardsCount;

  // Supprimer la carte de la main de l'opponent
  while (opponentHand.firstChild) {
    opponentHand.removeChild(opponentHand.firstChild);
  }

  // Afficher cartes dans la hand de l'opponent
  for (let i = 0; i < data.opponent.handSize; i++) {
    const oppCarte = document.createElement("div");
    oppCarte.className = "opponent-hand-size"
    opponentHand.appendChild(oppCarte);
  }

}

function renderOpponentBoard(data) {
  const opponentBoard = document.querySelector(".opponent-board");
  const dataOpponent = data.opponent;
  taunt = false;

  // Supprimer carte sur le board de l'opponent
  while (opponentBoard.firstChild) {
    opponentBoard.removeChild(opponentBoard.firstChild);
  }
  
  // Ajouter les cartes sur le board de l'opponent
  for (const card of dataOpponent.board) {
    const cardDiv = document.createElement("div");
    opponentBoard.appendChild(cardDiv);
    cardDiv.outerHTML = genererCarte(card);
    
    // if (card.mechanics.includes("Taunt")) {
    //   taunt = true;
    // }

    // if (card.mechanics.includes("Stealth") || (taunt && !card.mechanics.includes("Taunt"))) {
    //   cardDiv.style.opacity = "80%";
    // }

    // cardDiv.addEventListener("click", function () { target(card.uid) });
  }
}

// function afficherChat() {
//   let chatDiv = document.getElementById("chat");
//   if (chatDiv.style.display === "none") {
//     chatDiv.style.display = "block";
//   } else {
//     chatDiv.style.display = "none";
//   }
// }

function showError(error) {
  let errorMsg = "";
  if (error == "NOT_ENOUGH_ENERGY") {
    errorMsg = "You don't have enough energy";
  }
  else if (error == "BOARD_IS_FULL") {
    errorMsg = "The board is full";
  }
  else if (error == "CARD_IS_SLEEPING") {
    errorMsg = "Give this minon some time before attacking";
  }
  else if (error == "MUST_ATTACK_TAUNT_FIRST") {
    errorMsg = "A minion with taunt is blocking the way";
  }
  else if (error == "OPPONENT_CARD_HAS_STEALTH") {
    errorMsg = "This minion is too stealthy for you";
  }
  else if (error == "HERO_POWER_ALREADY_USED") {
    errorMsg = "You already used your power this turn";
  }
  else if (error == "WRONG_TURN") {
    errorMsg = "Wait your turn";
  }
  else if (error = "LAST_GAME_LOST") {
    errorMsg = "You lost"
  }
  else {
    errorMsg = error;
  }

  document.querySelector(".error-message").style.display = "flex";
  document.querySelector(".error-message").innerHTML = errorMsg;
  setTimeout(function () {
    document.querySelector(".error-message").style.display = "none";
  }, 2000);
}

function attack(uid, state) {
  if (state != "SLEEP") {
    attacker = uid;
  }
  else {
    showError("CARD_IS_SLEEPING");
  }
}

function target(uid) {
  if (attacker != null) {
    action("ATTACK", attacker, uid);
  }
  attacker = null;
}

window.addEventListener("load", () => {
  let path = window.location.pathname;
  let page = path.split("/").pop();
  if (page == "game.php") {

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
  }
});
