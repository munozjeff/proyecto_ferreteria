<?php

include "connect.php";


$json = file_get_contents('php://input');
$data=json_decode($json);
$user = $data->username;
$password = $data->password;

$passwd_comp = md5($password);
$message;
$code;

session_start();
$_SESSION["autenticado"]="";

$connect = new connect();
$mysqli = $connect->mysqli();
$consulta = "SELECT * FROM user where username='$user'and roll='admin'";
$result= $mysqli->query($consulta);
$row = $result->fetch_array(MYSQLI_NUM);
$filas=$result->num_rows;

if ($filas > 0){
    $passwdc = $row[2];

    if($passwdc == $passwd_comp){
        $nombre_usuario = $row[1];
        $_SESSION["autenticado"]= "SIx3";
        $code = 1; 
        $message = "admin/product_register/product_register.html";
    }
    else {
        $code = 0;
        $message="contraseña incorrecta";

    }
}
else{
    $code = 0;
    $message="no existe el usuario o esta inactivo";
    
}  
    mysqli_close($mysqli);
    $response = array("code"=>$code,"message"=>$message);
    echo(json_encode($response));
?>