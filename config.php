<?php    
define('dbhost', 'localhost');
define('dbusername', 'root');
define('dbpass', '');

// Connect to the server
$conn = mysqli_connect(dbhost, dbusername, dbpass)
    or die("<p>The database server is not available.</p>" .
        "<p>Error code: " . mysqli_connect_error() . "</p>");
echo "<p>Successfully connected to the database server.</p>";

// Create the database
$create_db = "CREATE DATABASE IF NOT EXISTS jewelry_designs";        
$QueryResult = mysqli_query($conn, $create_db);

if ($QueryResult) {
    echo '<script type="text/javascript"> 
        alert("Database successfully created or already exists."); 
        window.location.href="tables.php";
        </script>';
} else {
    echo '<script type="text/javascript"> 
        alert("Error creating the database: ' . mysqli_error($conn) . '"); 
        window.location.href="index.php";
        </script>';
}
include "tables.php";
?>
