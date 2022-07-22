<?php 
    require 'connectDB.php';
?>

<!DOCTYPE html>
<html>

<head>
    <title>My Events</title>
    <link rel="stylesheet" href= "static/style.css"/>
</head>

<body>
    <h1>My Events</h1>
    <button onclick="location.href = 'AddEvent.html';">Add Event</button>
    <br><br>
    <?php      
        $eventQuery = mysqli_query($con, "SELECT * FROM events");
        if ($eventQuery->num_rows > 0) {
            while($cols = $eventQuery->fetch_assoc()) { 
                $eventID = $cols["event_id"];
                
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

                // echo '<option>Date: '.$row["arrival_date"].', ID:'.
                // $row["shipment_id"].'</option>'; 
                // echo '<option>Date: '.$row["arrival_date"].', ID:'.
                // $row["shipment_id"].'</option>'; 
                echo '<div id="'.$eventID.'" class="event">
                    <img src="pictures/'.$eventID.'.png" alt="Event Picture" width="350" height="250">
                    <h2>'.$name.'</h2>
                    <div class="eventInfo" style="height:75px;">
                        '.$description.'
                    </div>
                    <br>
                    <div class="eventInfo">
                        '.$location.'
                    </div>
                    <br>
                    <div class="eventInfo">
                        From: '.$start.'<br>
                        To: '.$end.'<br>
                    </div><br>
                    <form action="EditEvent.php" method="POST">
                        <input type="hidden" name="eventID" value="'.$eventID.'">
                        <input type="submit" value="Edit">
                    </form>
                </div>';
            }
        }
    ?>
    
</body>


</html>