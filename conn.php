<?php

 $conn = new  mysqli("localhost","root","", "testi");

 if($conn->connect_error){
    echo  $conn->connect_error;
 }

?>