<?php    
define('dbhost', 'localhost');
define('dbusername', 'root');
define('dbpass', '');
define('dbname', 'jewelry_designs');


    $conn = mysqli_connect(dbhost, dbusername, dbpass, dbname)
        or die("<p>The database server is no        t available.</p>".
            "<p>Error code: " . mysqli_connect_error() . "</p>") ;
    echo "<p>Successfully connected to the database server.</p>";

    //check if databae available 
    mysqli_select_db($conn, "jewelry_designs");
        or die("<p>The database is not available.</p>".
         "<p>Error code " . mysqli_error($conn)) . "</p>";
    echo "<p>Successfully opened the database.</p>";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect data
    $jewelry_type = $conn->real_escape_string($_POST['jewelry-type']);
    $material = $conn->real_escape_string($_POST['materials']);
    $gemstones = $conn->real_escape_string($_POST['gemstones']);
    $design_details = $conn->real_escape_string($_POST['design-details']);
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);

    // Query to insert form data into the table
    $sql = "INSERT INTO design_requests (jewelry_type, material, gemstones, design_details, name, email, phone) 
            VALUES ('$jewelry_type', '$material', '$gemstones', '$design_details', '$name', '$email', '$phone')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "New design request submitted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the connection
mysqli_close($conn);
?>