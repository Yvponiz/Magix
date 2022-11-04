<?php
    require_once("action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $data = $action->execute();

    echo json_encode($data["results"]);
?>
