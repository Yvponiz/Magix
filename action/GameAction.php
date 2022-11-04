<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $key = $_SESSION["key"];
            
            if (isset($_GET["retour"])){
                header("location:lobby.php");
                exit;
            }
            
            return compact("key");
		}
    }