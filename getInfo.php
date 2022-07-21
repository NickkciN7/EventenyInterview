<?php
    require 'connectDB.php';

    $eventID = $_GET["eventID"];
    $eventQuery = mysqli_query($con, "SELECT * FROM events WHERE event_id = $eventID");
    $cols = $eventQuery->fetch_assoc();

    $name = $cols["name"];

    $location = $cols["location"];
    $locExp = explode(",",$location);
    $address = $locExp[0];
    $city = substr($locExp[1], 1);
    // echo json_encode($city);
    $stateZipExp = explode(" ", $locExp[2]);
    $state = "";
    $zipCode = "";
    if(count($stateZipExp) == 3){
        //is state with 1 part
        $state = $stateZipExp[1];
        $zipCode = $stateZipExp[2];
    } else {
        //is state with 2 parts
        $state = $stateZipExp[1]." ".$stateZipExp[2];
        $zipCode = $stateZipExp[3];
    }
    
    $start = $cols["start_time"];
    
    $end = $cols["end_time"];

    $description = $cols["description"];

    $json = new stdClass();
    $json->name = $name;
    $json->address = $address;
    $json->city = $city;
    $json->state = $state;
    $json->zipCode = $zipCode;
    $json->start = $start;
    $json->end = $end;
    $json->description = $description;

    echo json_encode($json);



    
?>
