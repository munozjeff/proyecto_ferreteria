<?php
    include "connect.php";
    include 'get_products.php';

    $connect = new connect();
    $mysqli = $connect->mysqli();

    $get = new get();
    $sql = "SELECT * FROM products";
    $products = $get->get_products($sql,$mysqli);
    mysqli_close($mysqli);
    echo($products);
?>