<?php
    include "connect.php";
    include 'get_products.php';
    $json = file_get_contents('php://input');
    $data=json_decode($json);
    $category = $data->category;

    $connect = new connect();
    $mysqli = $connect->mysqli();

    $get = new get();
    $sql = "SELECT * FROM products WHERE publish=1 AND category = '$category'";
    $products = $get->get_products($sql,$mysqli);
    mysqli_close($mysqli);
    echo($products);
?>