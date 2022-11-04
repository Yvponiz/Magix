<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

		public function executeAction() {
            $username = $_SESSION["username"];
            $key = $_SESSION["key"];
            $error = "";
            $data = [];
            $data["key"] = $key;
            
            if(isset($_GET["play"])){
                $data["type"] = "PVP";
                $result = parent::callAPI("games/auto-match", $data);

                if ($result === "CREATED_PVP" || $result === "JOINED_PVP" ){
                    header("location:jeu.php");
                    exit;
                }
                else{
                    $error = $result;
                }
            }
            elseif(isset($_GET["practice"])) {
                $data["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_TRAINING"){
                    header("location:jeu.php");
                    exit;
                }
                else{
                    $error = $result;
                }
            }
            return compact ("key", "username", "error");
		}
    }