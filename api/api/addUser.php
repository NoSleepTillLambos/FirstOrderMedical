<?php

include 'db_connection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: * ");

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$name = $data->name;
$surname = $data->surname;
$email = $data->email;
$contact = $data->contact;
$username = $data->username;
$password = $data->password;

$passwordEncrypt = md5($password);

$sql = "INSERT INTO doctors (id, name, surname, email, contact, username, password, created_at) VALUES (NULL, '$name', '$surname','$email', '$contact', '$username','$passwordEncrypt', CURRENT_TIMESTAMP);";
$result = mysqli_query($conn, $sql);


if (!$result) {
    echo("Error Description: " . mysqli_error($conn));
}
else {
    echo("User added successfully");
}

?>