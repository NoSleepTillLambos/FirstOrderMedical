<?php

$dbhost = "localhost";
$dbusername = "root";
$dbpassword = "root";
$dbname = "peaceofmind";

$conn = new mysqli($dbhost, $dbusername, $dbpassword, $dbname);

if ($mysqli->connect_error) {
    echo 'Failed to connect to Database: ' . $mysqli->connect_error;
    exit();
}

?>