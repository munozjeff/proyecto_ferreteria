<?php
    class get{
        function get_products($sql,$mysqli){
            $result= $mysqli->query($sql);
            $product_list=[];
            while($row = mysqli_fetch_row($result)){
                $product = array("code"=>$row[1],
                                    "name"=>$row[2],
                                    "descrption"=>$row[3],
                                    "image"=>$row[4],
                                    "category"=>$row[5],
                                    "provider"=>$row[6],
                                    "cant"=>$row[7],
                                    "price"=>$row[8]);
                array_push($product_list,$product);
            }
            return json_encode($product_list);
        }
    }     
?>