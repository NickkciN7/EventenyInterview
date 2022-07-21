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
    $eventID = $_POST['eventID'];
    

    //escape characters to allow proper sql query
    //for some reason cant put right expression directly in sql query
    $name = mysqli_real_escape_string($con, $name);
    $location = mysqli_real_escape_string($con, $location);
    $description = mysqli_real_escape_string($con, $description);

    $updateEvent = mysqli_query($con, "UPDATE events SET name = '$name', location = '$location', start_time = '$start', end_time = '$end', description = '$description' WHERE event_id = $eventID");
    if($updateEvent){
        if (!isset($_POST['noPic']) ){ //there is a new pic
            if(move_uploaded_file($_FILES["pic"]["tmp_name"], "pictures/".$eventID.".png")){
                echo json_encode("Success");
            } else {
                echo json_encode("Failure");
            }
        }
        echo json_encode("Success");
    } else {
        echo json_encode($con -> error);
    }
?>
