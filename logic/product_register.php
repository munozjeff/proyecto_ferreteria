<?php
    include "connect.php";
    include "save_data.php";

    $json = file_get_contents('php://input');
    $product_data=json_decode($json);
    $message;
    $code;
    try{
        $connect = new connect();
        $mysqli = $connect->mysqli();
        $sql = "SELECT * FROM products WHERE code='$product_data->code'";
        $result = $mysqli->query($sql);
        if(mysqli_num_rows($result)<=0 ){
            $image_encode = $product_data->image;
            $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image_encode));
            $info_imagen = getimagesizefromstring($image_data);
            if ($info_imagen !== false) {
                $extension_imagen = image_type_to_extension($info_imagen[2]);
                $filename = $product_data->code.$extension_imagen;
                $file_path = '../user_image/' . $filename;
                $file = fopen($file_path, 'w');
                fwrite($file, $image_data);
                fclose($file);
                $sql = "INSERT INTO products (code, 
                             name, description, 
                             image, category, 
                             provider, cant, price, 
                             publish) VALUES ('$product_data->code', 
                             '$product_data->name', '$product_data->description',
                             '$filename', '$product_data->category', 
                             '$product_data->provider', '$product_data->existence',
                             '$product_data->price', 
                             '$product_data->publish')";
    
                $result = $mysqli->query($sql);
                $code=$result;
                if($result){
                    $save_data = new save_data();
                    $save_data->save_provider($product_data->provider, $mysqli);
                    $save_data->save_category($product_data->category, $mysqli);
                    $message="Registro exitoso";
                }
                else{
                    $message="Error al registrar";
                }
            }
        }
        else{
             $code=false;
             $message="Error, ya existe un producto registrado con el codigo $product_data->code";
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