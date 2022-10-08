<?php


include 'db_connection.php';

header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Headers: * ');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$name = $data->name;
$surname = $data->surname;
$age = $data->age;
$gender = $data->gender;
$cellNo = $data->cellNo;
$email = $data->email;
$password = $data->password;
$specialization = $data->specialization;
$image = $data->image;

$passwordEncrypt = md5($password);

list($type, $image) = explode(';', $image);
list(, $image) = explode(',', $image);
$image = base64_decode($image);

$newPath = 'profiles/' . time() . '.jpg';

file_put_contents($newPath, $image);

if ($name === '') {
    echo "There are no doctors";
}
else {
    $sql = "INSERT INTO doctors (id, name, surname, age, gender, cellNo, email, password, specialization, image) VALUES (NULL, '$name', '$surname', '$age', '$gender', '$cellNo', '$email', '$passwordEncrypt', '$specialization', '$newPath');";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        echo ("Error Description: " . mysqli_error($conn));
    }
    else {
        echo "true";
    }
}
?>