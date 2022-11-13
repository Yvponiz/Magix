let yourTurn = false;
let firstRender = true;
let waiting = "Finding an opponent";

const state = () => {
  fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle
    method: "POST",       // l’API (games/state)
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // contient les cartes/état du jeu.

      if (data != "WAITING") {
        renderGame(data);
        yourTurn = data.yourTurn;
      }
      else if (data === "LAST_GAME_LOST") {
        showError(data);
        setTimeout(function () {
          window.location.href = "lobby.php";
        }, 2000);
      }
      else if (data === "WAITING"){
        waitingDiv = document.querySelector(".waiting");
        if (document.querySelector(".waiting").style.display == ""){
            document.querySelector(".waiting").style.display = "flex";
        }
        document.querySelector(".waiting").innerHTML = waiting;
        if (waiting == "Finding an opponent..."){
            waiting = "Finding an opponent";
        }
        else{
            waiting = waiting+".";
        }
      }

      setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}


// // Actions de jeu avec les cartes
// function cardAction(type, uid) {
//   if(type === "PLAY"){
//     apiCall(type, uid, undefined, true);
//   }
//   else {
//     const onSelectedTarget = (event)=> {
//       let targetuid = event.currentTarget.getAttribute("data-uid")

//       for (element of document.querySelectorAll(".opponent-info, #opponent-board .card-frame")){
//         element.removeEventListener('click', onSelectedTarget);
//       }

//     }

//     for (element of document.querySelectorAll(".opponent-info, #opponent-board .card-frame")){
//       element.addEventListener('click', onSelectedTarget);
//     }
//   }
// }

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
        console.log(data);
        if (typeof data != "string") {
          console.log(data);
        }
        else {
          showError(data);
        }
      })
  }
  else {
    console.log("WRONG_TURN");
  }
}

// let lastActionId = 0; // Tracker la derniere action

const renderGame = (data) => {
      if (firstRender) {
      document.querySelector(".opponent-class").style.background = `url(images/class/${data.opponent.heroClass}.jpg)`;

      firstRender = false;
   }
    
    //Render static fields
    document.querySelector(".timer").innerHTML = data.remainingTurnTime;
    document.querySelector(".info-hp").innerHTML = data.hp;
    document.querySelector(".info-mp").innerHTML = data.mp;
    document.querySelector(".info-cards").innerHTML = data.remainingCardsCount;
    
    if (data.opponent){
      document.querySelector(".opponent-hp").innerHTML = data.opponent.hp
      document.querySelector(".opponent-mp").innerHTML = data.opponent.mp
      document.querySelector(".opponent-cards").innerHTML = data.opponent.remainingCardsCount;
    }
}

// function renderPlayer(gameState){
//   const hand = document.getElementById("hand");
//   const infoHp = document.getElementById("info-hp");
//   const infoMp = document.getElementById("info-mp");
//   const cardsLeft = document.getElementById("info-cards-remaining");

//   // Supprimer carte dans la main
//   while (hand.firstChild) {
//     hand.removeChild(hand.firstChild);
//   }

//   // Ajouter les cartes dans la main
//   for (const dataCarte of gameState.result.hand) {
//     const carte = document.createElement("div");
//     hand.appendChild(carte);
//     carte.outerHTML = genererCarte(dataCarte); // Fonction qui inject du HTML dans le div
//   }

//   for (element of hand.querySelectorAll(".card-frame")){
//     element.addEventListener('click', (event)=> {
//       let uid = event.currentTarget.getAttribute("data-uid")
//       event.currentTarget.style.border = "solid 4px green"
//       apiCall("PLAY", uid);
//     });
//   }

//   // Affichage des stats du joueur
//   infoHp.innerHTML = gameState.result.hp;
//   infoMp.innerHTML = gameState.result.mp;
//   cardsLeft.innerHTML = gameState.result.remainingCardsCount;
// }

// function renderBoard(gameState){
//   const board = document.getElementById("board");

//   // Supprimer carte sur le board du joueur
//   while (board.firstChild) {
//     board.removeChild(board.firstChild);
//   }

//   // Ajouter les cartes sur le board du joueur
//   for (const dataCarte of gameState.result.board) {
//     const carte = document.createElement("div");
//     board.appendChild(carte);
//     carte.outerHTML = genererCarte(dataCarte);
//   }

//   for (element of board.querySelectorAll(".card-frame")){
//     element.addEventListener('click', (event)=> {
//       let uid = event.currentTarget.getAttribute("data-uid")
//       event.currentTarget.style.border = "solid 4px green"
//       cardAction("ATTACK", uid);
//     });
//   }
// }

// function renderOpponent(data){
//   const opponentHp = document.querySelector(".opponent-hp");
//   const opponentMp = document.querySelector(".opponent-mp");
//   const opponentHand = document.querySelector(".opponent-hand");
//   const opponentCardsLeft = document.querySelector(".opponent-cards-remaining");
//   const opponentClass = document.querySelector(".opponent-class");

//   // Supprimer le Hero Class dans le div
//   while (opponentClass.firstChild) {
//     opponentClass.removeChild(opponentClass.firstChild);
//   }

//   // Supprimer la carte de la main de l'opponent
//   while (opponentHand.firstChild) {
//     opponentHand.removeChild(opponentHand.firstChild);
//   }

//   // Afficher le Hero Class dans le div
//   var heroImg = document.createElement("img");
//   heroImg.src = `images/class/${data.result.opponent.heroClass}.jpg`;
//   heroImg.className = "hero-class-frame";
//   opponentClass.appendChild(heroImg);

//   // Afficher cartes dans la hand de l'opponent
//   for (let i = 0; i < data.result.opponent.handSize; i++) {
//     const oppCarte = document.createElement("div");
//     oppCarte.className = "opponent-hand-size"
//     opponentHand.appendChild(oppCarte);
//   }

//   // Affichage des stats de l'adversaire
//   opponentHp.innerHTML = data.result.opponent.hp;
//   opponentMp.innerHTML = data.result.opponent.mp;
//   opponentCardsLeft.innerHTML = data.result.remainingCardsCount;
// }

// function renderOpponentBoard(gameState){
//   const opponentBoard = document.getElementById("opponent-board");

//   // Supprimer carte sur le board de l'opponent
//   while (opponentBoard.firstChild) {
//     opponentBoard.removeChild(opponentBoard.firstChild);
//   }

//   // Ajouter les cartes sur le board de l'opponent
//   //   }
//   for (const dataCarte of gameState.result.opponent.board) {
//     const carte = document.createElement("div");
//     opponentBoard.appendChild(carte);
//     carte.outerHTML = genererCarte(dataCarte);
//     if(dataCarte.mechanics[0] === "Taunt"){
//       carte.style.border = "solid 3px yellow"
//     }
//     else if (dataCarte.mechanics[0] === "Stealth"){
//       carte.style.opacity = "0.5"
//     }
//   }
// }

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
  else if (error = "LAST_GAME_LOST"){
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

window.addEventListener("load", () => {
  let path = window.location.pathname;
  let page = path.split("/").pop();
  if (page == "game.php") {

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
  }
});
