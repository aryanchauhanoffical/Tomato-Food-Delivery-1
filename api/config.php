<?php
$host = 'localhost';
$dbname = 'tomato_food_delivery';
$username = 'root';
$password = '';
$port = 3307;

$conn = new mysqli($host, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}
?> 