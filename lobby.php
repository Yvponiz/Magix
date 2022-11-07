<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>


<div class="wrapper-lobby main-container">
    <div class="deck-manager">
        <iframe style="width:100%" src="https://magix.apps-de-cours.com/server/#/deck/<?= $data["key"] ?>">
        </iframe>
        <button class="deck-manager-close">Close</button>
    </div>

    <div class="menu-title">
        Mode de jeu
    </div>

    <div class="menu">
        <div class="choice">
            <a href="?play=true">Mission</a>
        </div>
        <div class="choice">
            <a href="?practice=true">Training</a>
        </div>
        <div class="choice">
            <span class="lobby-deck-btn">Deck</span>
        </div>
        <div class="choice">
            <a href="notes.php">Notes</a>
        </div>
        <div class="choice">
            <a href="?logout=true">Exit</a>
        </div>
    </div>

    <div class="codec">
        <div class="left-codec">
            <img src="images/gifs/campbell-codec.gif" alt="Campbell Codc">
        </div>
        <iframe style="width:700px;height:240px;" onload="applyStyles(this)" src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"] ?>">
        </iframe>
        <div class="right-codec">
            <img src="images/gifs/snake-codec.gif" alt="Snake Codec">
        </div>
    </div>

</div>
<?php
    require_once("partial/footer.php");