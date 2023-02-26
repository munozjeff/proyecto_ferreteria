<?php
    include "connect.php";
    $category=[];
    $provider=[];
    $code = 0;
    try{
        $connect = new connect();
        $mysqli = $connect->mysqli();
        $sql = "SELECT * FROM category";
        $result= $mysqli->query($sql);
        
        while($row = mysqli_fetch_row($result)){
            array_push($category,$row[1]);
        }

        $sql = "SELECT * FROM providers";
        $result= $mysqli->query($sql);
        
        while($row = mysqli_fetch_row($result)){
            array_push($provider,$row[1]);
        }
        $code = 1;
    }
    catch(Exception $exception){
        $code = 0;
    }
    mysqli_close($mysqli);
    $data = array("code" => $code, "category" => $category, "provider" => $provider);
    echo(json_encode($data));
?>