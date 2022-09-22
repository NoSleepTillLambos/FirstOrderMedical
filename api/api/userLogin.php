<?php


include 'db_connection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: * ");

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$username = $data->username;
$password = $data->password;

$encryptedPassword = md5($password);

if ($username === "" && $password === "") {
    echo "Err";
}
else {
    $sql = "SELECT * FROM receptionists WHERE username = '$username' AND password = '$password';";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);

    if ($resultCheck > 0) {
        echo 'true';
    }
    else {
        echo 'false';
    }
}

?>