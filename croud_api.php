<?php

header("content-type: application/json");
include 'conn.php';

function register_student($conn){

    extract($_POST);
    $data=array();
    $query="insert into student (full_name, phone, address)values('$full_name', '$phone', '$address')";

    $result=$conn->query($query);

    if($result){
        $data=array("status"=> true, "data"=> "Successfully Registered");
    }else{
        $data=array("status"=> false, "data"=> $conn->error);

    }
    echo json_encode($data);
}

function read_students($conn){
    extract($_POST);
    $data=array();
    $array_data=array();
    $query="select * from student";

    $result=$conn->query($query);

    if($result){
        while($row=$result->fetch_assoc()){
            $array_data[]=$row;
        }
        $data=array("status"=> true, "data"=> $array_data);
    }else{
        $data=array("status"=> false, "data"=> $conn->error);

    }
    echo json_encode($data);
}

function get_students($conn){
    extract($_POST);
    $data=array();
    $query="select * from student where id='$id'";

    $result=$conn->query($query);

    if($result){
        $row=$result->fetch_assoc();
        
        $data=array("status"=> true, "data"=> $row);
    }else{
        $data=array("status"=> false, "data"=> $conn->error);

    }
    echo json_encode($data);
}

function update_students($conn){
    extract($_POST);
    $data=array();
    $query="update student set full_name='$full_name', phone='$phone', address='$address' where id='$id'";

    $result=$conn->query($query);

    if($result){
        $data=array("status"=> true, "data"=> "Successfully Updated");
    }else{
        $data=array("status"=> false, "data"=> $conn->error);

    }
    echo json_encode($data);
}

function delete_student($conn){
    extract($_POST);
    $data=array();
    $query="delete from  student  where id='$id'";

    $result=$conn->query($query);

    if($result){
        
        $data=array("status"=> true, "data"=> "Successfully Deleted");
    }else{
        $data=array("status"=> false, "data"=> $conn->error);

    }
    echo json_encode($data);
}








if(isset($_POST['action'])){
    $action=$_POST['action'];
    $action($conn);

}else{

    echo json_encode(array("status"=> false, "data"=> "Action Required...."));

}
?>