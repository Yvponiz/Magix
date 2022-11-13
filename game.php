<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();


    require_once("partial/header.php");
?>

<div class="wrapper-jeu main-container" id="wrapper-jeu">
    <div class="opponent">
        <div class="opponent-hand" id="opponent-hand"></div>
        <div class="opponent-info">
            <div class="opponent-info-hp" id="opponent-hp">30</div>
            <div class="opponent-info-class" id="opponent-info-class"></div>
            <div class="opponent-info-mp" id="opponent-mp"></div>
        </div>
        <div class="opponent-cards cards-remaining" style="align-self:flex-start;" id="opponent-cards-remaining">30</div>
    </div>

    <div class="board" id="opponent-board"></div>
    <div class="board-chat">
        <button class="toggle-chat" onclick="afficherChat()"></button>
        <div class="chat" id="chat">
            <iframe style="width:300px;height:100px;" onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
            </iframe>
        </div>
    </div>
    <div class="board" id="board"></div>

    <div class="bottom-section">
        <div class="info-flex">
            <div class="info-hp" id="info-hp">30</div>
            <div class="info-mp" id="info-mp"></div>
            <div class="info-cards cards-remaining" id="info-cards-remaining">30</div>
        </div>

        <div class="hand" id="hand"></div>

        <div class="right-flex">
            <div class="right-flex-choice">
                <button onclick="action('HERO_POWER')" id="hero-power">Hero Power</button>
            </div>
            <div class="right-flex-choice">
                <button onclick="action('END_TURN')" id="end-turn">End Turn</button>
            </div>
            <div class="right-flex-choice">
                <button onclick="action('SURRENDER')" id="surrender">Surrender</button>
            </div>
            <div class="timer" id="timer">50</div>
        </div>

    </div>
    <div class="error-message"></div>
</div>
<?php
    require_once("partial/footer.php");