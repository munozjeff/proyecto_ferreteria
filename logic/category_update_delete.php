<?php
include "connect.php";

    $json = file_get_contents('php://input');
    $data=json_decode($json);
    $value = $data->value;
    $message;
    $code;
    try{
        $connect = new connect();
        $mysqli = $connect->mysqli();
        if($data->column == 'Proveedor'){
            $sql = "SELECT * FROM providers WHERE provider='$value'";
            $result = $mysqli->query($sql);
            if(mysqli_num_rows($result)>0 ){
                $sql = "DELETE FROM providers WHERE provider='$value'";
                $result = $mysqli->query($sql);
                if($result){
                    $sql = "UPDATE products SET  provider='' WHERE provider='$value'";
                    $result = $mysqli->query($sql);
                    $code = $result;
                    $message = "se elimino $value correctamente";
                }
                else{
                    $code = false;
                    $message = "Error al eliminar $value";
                }
            }
            else{
                $code = false;
                $message = "$value no existe";
            }
        }
        else if($data->column == 'Categoria'){
            $sql = "SELECT * FROM category WHERE category='$value'";
            $result = $mysqli->query($sql);
            if(mysqli_num_rows($result)>0 ){
                $sql = "DELETE FROM category WHERE category='$value'";
                $result = $mysqli->query($sql);
                if($result){
                    $sql = "UPDATE products SET  category ='' WHERE category ='$value'";
                    $result = $mysqli->query($sql);
                    $code = $result;
                    $message = "se elimino $value correctamente";
                }
                else{
                    $code = false;
                    $message = "Error al eliminar $value";
                }
            }
            else{
                $code = false;
                $message = "$value no existe";
            }
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