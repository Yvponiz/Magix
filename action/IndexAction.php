<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction{

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		public function executeAction() {
			$erreurLogin = "";

			if (isset($_POST["username"]) && isset($_POST["password"])){
				$data = [];
				$data["username"] = $_POST["username"] ?? NULL;
				$data["password"] = $_POST["password"] ?? NULL;

				$result = parent::callAPI("signin", $data);

				if ($result === "INVALID_USERNAME_PASSWORD") {
					$erreurLogin = "Mot de passe ou nom d'utilisateur invalide";
				}
				else {
					$_SESSION["key"] = $result->key;
					$_SESSION["username"] = $data["username"];
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
					header("location:lobby.php");
					exit;
				}

				return compact("erreurLogin");
			}
		}
	}