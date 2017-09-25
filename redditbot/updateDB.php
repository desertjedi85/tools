<?php

if (isset($_POST["id"])) {
    $id = $_POST["id"];

    updateDB($id);
}


function updateDB ($id) {
    require("config/dbconfig.php");
    $ip = $_SERVER["REMOTE_ADDR"];
    $mysqli = new \mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_errno) {
        echo "Errno: " . $mysqli->connect_errno . "\n";
        echo "Error: " . $mysqli->connect_error . "\n";
        // exit();
        //TODO: Add error table
    }
    $stmt = $mysqli->prepare("INSERT INTO replies (postId) VALUES (?)");
    $stmt->bind_param('s', $id);
    $stmt->execute();
    // echo "URL Added Successfully.";
}