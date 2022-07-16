<?php 
    require 'connectDB.php';
    $Query = mysqli_query($con, " SELECT * FROM events ");
    if ($Query->num_rows > 0) {
        while($row = $Query->fetch_assoc()) { 
            echo $row["event_id"].' '.$row["name"].' '.$row["location"].' '.$row["start_time"].' '.$row["end_time"].' '.$row["description"]; 
        }
    }
?>