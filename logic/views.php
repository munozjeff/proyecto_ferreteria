<?php
    include "connect.php";

    $json = file_get_contents('php://input');
    $data=json_decode($json);
    $product_code = $data->code;
    $message;
    $code;
    try{
        $connect = new connect();
        $mysqli = $connect->mysqli();
        $sql = "UPDATE products SET views = views + 1 WHERE code = '$product_code'";
        $result = $mysqli->query($sql);
        if($result){
            $code=true;
            $message="Se actualizo";
        }   
        else{
            $code=false;
            $message="Error";
        }
    }
    catch(Exception $exception){
        $code=false;
        $message = $exception->getMessage();
    }
    mysqli_close($mysqli);
    
    $array = array("code"=>$code,"message"=>$message);
    echo(json_encode($array));
?>