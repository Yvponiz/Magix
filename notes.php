<?php
    require_once("action/CommonAction.php");
    require_once("action/NotesAction.php");

    $action = new NotesAction();
    $data = $action->execute();

    require_once("partial/lobby-h.php");
?>

<div class="wrapper-notes" id="wrapper-notes">
    <div class="codec">
        <div class="codec-top">
            <div class="left-codec">
                <img src="images/gifs/mei-ling-codec.gif" alt="Mei-Ling Codec">
            </div>
                <img class="codec-middle" src="images/codec.png" alt="">
            <div class="right-codec">
                <img src="images/gifs/snake-codec.gif" alt="Snake Codec">
            </div>
        </div>
        <div class="codec-text">
            <form action="notes.php" method="post">
                <div class="notes-entry">
                    <div class="sujet">
                        <input class="notes-entry-style"type="text" required placeholder="Sujet" name="sujet">
                    </div>
                    <div class="description">
                        <textarea class="notes-entry-style" required placeholder="Entrez votre note" name="note"></textarea>
                    </div>
                    <div class="notes-buttons">
                        <button >Envoyer</button>
                        <a class="notes-quitter" href="lobby.php">Quitter</a>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <?php
        foreach($data["notes"] as $notes){
            ?>
                <div class="notes">
                    <div class="notes-date"><?= $notes["date"] ?></div>
                    <div class="notes-sujet"> <?= $notes["sujet"] ?></div>
                    <div class="notes-description"><?= $notes["note"] ?></div>
                    <div class="notes-quitter" onclick="deleteNote(<?= $notes['id'] ?>)"><a href="notes.php">Supprimer</a></div>
                </div>
            <?php
        }
    ?>

</div>