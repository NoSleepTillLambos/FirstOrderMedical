<?php

include "db_connection.php";

header("Access-Control-Origin= *");
header("Access-Control-Headers= *");

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$email = $data->email;


if ($email === "") {
    echo "";
}
else {
    $sql = "SELECT = FROM patients WHERE email = '$email';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);

    if ($resultCheck > 0) {

        # checking for values
        echo "Not available";
    }
    else {
        echo "Available";
    }
}






?>