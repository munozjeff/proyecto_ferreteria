<?php
    include "connect.php";

    $json = file_get_contents('php://input');
    $product_data=json_decode($json);
    $product_code = $product_data->code;
    $message;
    $code;
    try{
        $connect = new connect();
        $mysqli = $connect->mysqli();
        $sql = "SELECT * FROM products WHERE code='$product_data->code'";
        $result = $mysqli->query($sql);
        if(mysqli_num_rows($result)>0 ){
            $row = mysqli_fetch_row($result);
            $sql = "DELETE FROM products WHERE code = '$product_data->code'";
            $result = $mysqli->query($sql);
            $code = $result;
            if($result){
                $file_path = '../user_image/'.$row[4];
                $message = "Se elimino el producto correctamente";
                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }
            else{
                $message ="Error al eliminar el producto con codigo $product_data->code";
            }
        }
        else{
            $code = false;
            $message = "El producto con codigo $product_data->code no existe";
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