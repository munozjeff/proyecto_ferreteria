<?php
    include "connect.php";
    include 'get_products.php';

    $connect = new connect();
    $mysqli = $connect->mysqli();

    $get = new get();
    $sql = "SELECT name,price,image,code,description FROM products ORDER BY views DESC LIMIT 10";
    $products = $get->get_products2($sql,$mysqli);
    mysqli_close($mysqli);
    echo($products);
?>