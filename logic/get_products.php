<?php
    class get{
        function get_products($sql,$mysqli){
            $result= $mysqli->query($sql);
            $product_list=[];
            while($row = mysqli_fetch_row($result)){
                $product = array("code"=>$row[1],
                                    "name"=>$row[2],
                                    "description"=>$row[3],
                                    "image"=>$row[4],
                                    "category"=>$row[5],
                                    "provider"=>$row[6],
                                    "cant"=>$row[7],
                                    "price"=>$row[8]);
                array_push($product_list,$product);
            }
            return json_encode($product_list);
        }
        function get_products2($sql,$mysqli){
            $result= $mysqli->query($sql);
            $product_list=[];
            while($row = mysqli_fetch_row($result)){
                $product = array("name"=>$row[0],"price"=>$row[1],"image"=>$row[2],"code"=>$row[3],"description"=>$row[4]);
                array_push($product_list,$product);
            }
            return json_encode($product_list);
        }
        function get_images($category,$mysqli){
            $image_list=[];
            for($i=0;$i<count($category);$i++){
                $name_category = $category[$i];
                $sql = "SELECT image FROM products WHERE category  ='$name_category' ORDER BY RAND() LIMIT 4";
                $result = $mysqli->query($sql);
                $array = [];
                while($row = mysqli_fetch_row($result)){
                    array_push($array,$row[0]);
                }
                $image_category = array("category"=>"$name_category","image"=>$array);
                array_push($image_list,$image_category);
            }
            return json_encode($image_list);
        }
    }     
?>