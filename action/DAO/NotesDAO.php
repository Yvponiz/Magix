<?php
    require_once("action/DAO/Connection.php");

    class NotesDAO {
        public static function authenticate($username, $password) {
            $connection = Connection::getConnection();
            $result = null;

            $statement = $connection->prepare("SELECT * FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            if ($row = $statement->fetch()) {
                if (password_verify($password, $row["password"])) {
                    $result = [];
                    $result["VISIBILITY"] = $row["visibility"];
                }
            }

            return $result;
        }

        public static function getNotes(){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM note_magix");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function addNotes($sujet, $note){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO note_magix (date, sujet, note) VALUES (CURRENT_DATE,?,?)");
            $statement->bindParam(1,$sujet);
            $statement->bindParam(2,$note);
            $statement->execute();
        }

        public static function deleteNotes($id){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("DELETE FROM note_magix WHERE id=?");
            $statement->bindParam(1,$id);
            $statement->execute();
        }
    }