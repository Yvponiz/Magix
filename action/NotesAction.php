<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/NotesDAO.php");

    class NotesAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

		public function executeAction() {
            
            if (isset($_POST["sujet"]) && isset($_POST["note"])){
                NotesDAO::addNotes($_POST["sujet"], $_POST["note"]);
            }
            else if(!empty($_POST["id"])){
                NotesDAO::deleteNotes($_POST["id"]);
            }

            $notes = NotesDAO::getNotes();

            return compact("notes");
		}
    }