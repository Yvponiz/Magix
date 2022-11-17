<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();


    require_once("partial/header.php");
?>

<div class="wrapper-game main-container">
    <div class="opponent">
        <div class="opponent-hand"></div>
        <div class="opponent-info">
            <div class="opponent-hp">30</div>
            <div class="opponent-class-frame"></div>
            <div class="opponent-mp">0</div>
        </div>
        <div class="opponent-cards cards-remaining" style="align-self:flex-start;">30</div>
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
    <div class="board" id="player-board"></div>

    <div class="bottom-section">
        <div class="info-flex">
            <div class="info-hp">30</div>
            <div class="info-mp">0</div>
            <div class="info-cards cards-remaining">30</div>
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
    <div class="waiting"></div>
</div>
<?php
    require_once("partial/footer.php");