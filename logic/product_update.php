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
        if(mysqli_num_rows($result)>0 ){
            $row = mysqli_fetch_row($result);
            $image = $row[4];
            if($product_data->image != null){
                $image_encode = $product_data->image;
                $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image_encode));
                $info_imagen = getimagesizefromstring($image_data);
                
                if ($info_imagen != false) {
                    $file_path = '../user_image/'.$image;
                    if (file_exists($file_path)) {
                        unlink($file_path);
                    }
                    $extension_imagen = image_type_to_extension($info_imagen[2]);
                    $filename = $product_data->code.$extension_imagen;
                    $file_path = '../user_image/' . $filename;
                    $file = fopen($file_path, 'w');
                    fwrite($file, $image_data);
                    fclose($file);
                    $image =  $filename;
                }
            } 
            $id = $row[0];
            $sql = "UPDATE products SET code='$product_data->code',
                                        name='$product_data->name',
                                        description='$product_data->description',
                                        image='$image', 
                                        category='$product_data->category', 
                                        provider='$product_data->provider',
                                        cant='$product_data->existence',
                                        price='$product_data->price', 
                                        publish='$product_data->publish' WHERE id = '$id'";
            $result = $mysqli->query($sql);
            $code=$result;
            if($result){
                $save_data = new save_data();
                if($product_data->provider != ""){
                    $save_data->save_provider($product_data->provider, $mysqli);
                }
                if($product_data->category != ""){
                    $save_data->save_category($product_data->category, $mysqli);
                }
                $message="Registro exitoso";
            }
            else{
                $message="Error al registrar";
            }
            $message="se actualizó correctamente";
        }   
        else{
             $code=false;
             $message="Error, no existe un producto registrado con el codigo $product_data->code";
        }
    }
    catch(Exception $exception){
        $code=false;
        $message = $exception->getMessage();
    }

    // function update(){
    //     $sql = "INSERT INTO products (code, 
    //                              name, description, 
    //                              image, category, 
    //                              provider, cant, price, 
    //                              publish) VALUES ('$product_data->code', 
    //                              '$product_data->name', '$product_data->description',
    //                              '$filename', '$product_data->category', 
    //                              '$product_data->provider', '$product_data->existence',
    //                              '$product_data->price', 
    //                              '$product_data->publish')";
        
    //     $result = $mysqli->query($sql);
    //     $code=$result;
    //     $message="Se actualizó correctamente";
    //     // if($result){
    //     //     $save_data = new save_data();
    //     //     $save_data->save_provider($product_data->provider, $mysqli);
    //     //     $save_data->save_category($product_data->category, $mysqli);
    //     //     $message="Registro exitoso";
    //     // }
    //     // else{
    //     //     $message="Error al registrar";
    //     // }
    // }
    mysqli_close($mysqli);
    
    $array = array("code"=>$code,"message"=>$message);
    echo(json_encode($array));
?>