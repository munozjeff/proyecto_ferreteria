<?php
    class save_data{
        function save_provider($provider, $mysqli){
            $sql = "SELECT * FROM providers where provider='$provider'";
            $result= $mysqli->query($sql);
            if(mysqli_num_rows($result)<=0){
                $sql = "INSERT INTO providers (provider) VALUES ('$provider')";
                $result= $mysqli->query($sql);
            }
        }

        function save_category($category, $mysqli){
            $sql = "SELECT * FROM category where category ='$category'";
            $result= $mysqli->query($sql);
            if(mysqli_num_rows($result)<=0){
                $sql = "INSERT INTO category (category) VALUES ('$category')";
                $result= $mysqli->query($sql);
            }
        }
    }     
?>