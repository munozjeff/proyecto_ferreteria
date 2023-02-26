<?php
    include "connect.php";
    include 'get_products.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $category = $data->category;
    $connect = new connect();
    $mysqli = $connect->mysqli();
    $get = new get();

    $images = $get->get_images($category,$mysqli);   
    mysqli_close($mysqli);
    echo($images);
?>