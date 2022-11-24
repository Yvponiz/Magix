let yourTurn = false;
let firstRender = true;
let waiting = "Finding an opponent";
let attacker = null;
let taunt = false;
let border = "solid 4px gray";
let opacity = "100%"

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
      else if (data === "LAST_GAME_WON") {
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
      else {
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

const renderGame = (data) => {
  if (firstRender) {
    document.querySelector(".opponent-class-frame").style.background = `url(images/class/${data.opponent.heroClass}.jpg)`;
    document.querySelector(".opponent-class-frame").style.backgroundSize = "cover";

    firstRender = false;
  }
  // Render static fields
  document.querySelector(".timer").innerHTML = data.remainingTurnTime;
  renderOpponent(data);
  renderOpponentBoard(data);
  renderPlayerBoard(data);
  renderPlayer(data);

  // Opponent Stats
  document.querySelector(".opponent-hp").innerHTML = data.opponent.hp
  document.querySelector(".opponent-mp").innerHTML = data.opponent.mp
  document.querySelector(".opponent-cards").innerHTML = data.opponent.remainingCardsCount;
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
        console.log("ACTION", data);
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

function renderPlayer(data) {
  const playerHp = document.querySelector(".info-hp");
  const playerMp = document.querySelector(".info-mp");
  const playerCardsCount = document.querySelector(".info-cards");
  const hand = document.querySelector(".hand");

  // Show Player Stats
  playerHp.innerHTML = data.hp;
  playerMp.innerHTML = data.mp;
  playerCardsCount.innerHTML = data.remainingCardsCount;

  // Show if Hero Power is available
  if(data.heroPowerAlreadyUsed == false && yourTurn && data.mp >= 2){
    document.getElementById("hero-power").style.backgroundColor = "green"
  }
  else{
    document.getElementById("hero-power").style.backgroundColor = ""
  }

  // Delete cards in Player hand
  while (hand.firstChild) {
    hand.removeChild(hand.firstChild);
  }

  // Delete cards in Player Hand
  data.hand.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "player-hand-cards";
    hand.appendChild(cardDiv);

    if (card.cost <= data.mp && yourTurn) {
      cardDiv.style.border = "#a1fbff 4px solid"
    }
    else {
      border = "";
    }
    cardDiv.innerHTML = createCard(card, border);

    // Add event listener on cards
    cardDiv.addEventListener("click", () => {
      action("PLAY", card.uid)
    })
  })
}

function renderPlayerBoard(data) {
  const board = document.getElementById("player-board");

  // Delete cards on Player Board
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  // Add cards on Player Board
  data.board.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "player-board-cards";
    board.appendChild(cardDiv);
    cardDiv.innerHTML = createCard(card);

    if (card.state == "SLEEP") {
      cardDiv.style.opacity = "50%";
    }

    // Add event listener on cards
    cardDiv.addEventListener("click", () => {
      attack(card.uid, card.state);
      console.log("CARD UID:", card.uid, "CARD STATE", card.state);
      if (card.uid == attacker) {
        cardDiv.style.border = "solid #dd5304 2px";
      }
    })

  });
}

function renderOpponent(data) {
  const opponentHp = document.querySelector(".opponent-hp");
  const opponentMp = document.querySelector(".opponent-mp");
  const opponentHand = document.querySelector(".opponent-hand");
  const opponentCardsLeft = document.querySelector(".opponent-cards");

  // Show Opponent stats
  opponentHp.innerHTML = data.opponent.hp;
  opponentMp.innerHTML = data.opponent.mp;
  opponentCardsLeft.innerHTML = data.remainingCardsCount;
  opponentHand.innerHTML = data.opponent.handSize;

  // // Afficher cartes dans la hand de l'opponent
  // for (let i = 0; i < data.opponent.handSize; i++) {
  //   const oppCarte = document.createElement("div");
  //   oppCarte.className = "opponent-hand-size"
  //   opponentHand.appendChild(oppCarte);
  // }

}

function renderOpponentBoard(data) {
  const opponentBoard = document.getElementById("opponent-board");
  taunt = false;

  // Supprimer carte sur le board de l'opponent
  while (opponentBoard.firstChild) {
    opponentBoard.removeChild(opponentBoard.firstChild);
  }

  // Ajouter les cartes sur le board de l'opponent
  data.opponent.board.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "opponent-board-cards"
    opponentBoard.appendChild(cardDiv);

    if (card.mechanics.includes("Taunt")) {
      taunt = true;
      cardDiv.style.border = "4px red solid"
    }
    else if (card.mechanics.includes("Stealth")) {
      cardDiv.style.opacity = "60%";
    }

    cardDiv.innerHTML = createCard(card, border, opacity);

    cardDiv.addEventListener("click", () => {
      console.log("CLICK", card.uid)
      target(card.uid);
    })
  })
}

function showChat() {
  let chatDiv = document.getElementById("chat");
  if (chatDiv.style.display === "none") {
    chatDiv.style.display = "flex";
  } else {
    chatDiv.style.display = "none";
  }
}

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
  else if (error == "LAST_GAME_LOST") {
    errorMsg = "You lost"
  }
  else if (error == "LAST_GAME_WON") {
    errorMsg = "You Won!"
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
  let heroPowerDiv = document.getElementById("hero-power");
  let endTurnDiv = document.getElementById("end-turn");
  let surrenderDiv = document.getElementById("surrender");
  let opponentDiv = document.querySelector(".opponent");

  if (page == "game.php") {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

    heroPowerDiv.addEventListener("click", () => { action("HERO_POWER") })
    endTurnDiv.addEventListener("click", () => { action("END_TURN") })
    surrenderDiv.addEventListener("click", () => { action("SURRENDER") })
    opponentDiv.addEventListener("click", () => { target(0) })
  }
});
