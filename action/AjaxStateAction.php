<?php
    require_once("action/CommonAction.php");

    class AjaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

		protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $results = "";
            
            if (isset($_POST["action"])){
                $data["type"] = $_POST["action"];
                if (isset($_POST["uid"])){
                    $data["uid"] = $_POST["uid"];
                }
                if (isset($_POST["targetuid"])){
                    $data["targetuid"] = $_POST["targetuid"];
                }
                $results = parent::callAPI("games/action", $data);
            }
            else {
                $results = parent::callAPI("games/state", $data);
            }

            return compact("results");
		}
    }