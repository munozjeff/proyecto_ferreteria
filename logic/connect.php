<?php
    class connect{
        private $host = "localhost";
        private $user = "root";
        private $pw = "";
        private $db = "fsm_database";

        public function mysqli(){
            $conexion = mysqli_connect($this->host, $this->user, $this->pw, $this->db);
            return $conexion;
        }
    }
?>