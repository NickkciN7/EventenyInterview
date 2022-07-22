<?php
    require 'connectDB.php';
    
    header("Content-Type: application/json");
    $eventID = $_POST['eventID'];
    
    $deleteEvent = mysqli_query($con, "DELETE FROM events WHERE event_id = $eventID");
    if($deleteEvent){
        echo json_encode("Success");
    } else {
        echo json_encode($con -> error);
    }
?>
