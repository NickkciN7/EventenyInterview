<?php
	$con = mysqli_connect("localhost","root","","eventplanner");
	// Check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  exit();
	}
	else{
		// echo "successful";
	}
?>