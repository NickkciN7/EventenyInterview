<?php
    require 'connectDB.php';
    
    header("Content-Type: application/json");
    $name = $_POST['name'];
    $location = $_POST['address'].", ".$_POST['city'].", ".$_POST['state']." ".$_POST['zipCode'];
    //make proper datetime format for sql insert
    $start = explode("T",$_POST['start']);
    $start = $start[0]." ".$start[1];
    $end = explode("T",$_POST['end']);
    $end = $end[0]." ".$end[1];
    $description = $_POST['description'];

    

    // echo json_encode($location);

    $insertEvent = mysqli_query($con, "INSERT INTO `events`(`name`, `location`, `start_time`, `end_time`, `description`) VALUES('$name', '$location', '$start', '$end', '$description')");
    if($insertEvent){
        $last_id = $con->insert_id;
        if(move_uploaded_file($_FILES["pic"]["tmp_name"], "pictures/".$last_id.".png")){
            echo json_encode("Success");
        } else {
            echo json_encode("Failure");
        }
    } else {
        echo json_encode($con -> error);
    }
?>
