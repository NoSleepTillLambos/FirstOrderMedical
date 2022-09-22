<?php

include "api/db_connection.php";

$sql1 = "SELECT * FROM doctors;";
$result = mysqli_query($conn, $sql1);
$resultCheck = mysqli_num_rows($result);


if ($resultCheck > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        # code...
        echo "
        
        <div class='row-item'>

            <p><strong>Name: </strong>" . $row['name'] . "</p>
            <p><strong>Name: </strong>" . $row['age'] . "</p>
            <p><strong>Name: </strong>" . $row['contact'] . "</p>
        
        ";
    }
}
else {
    echo "<h1>No data found on db</h1>";
}




?>