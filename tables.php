<?php
include 'config.php';

// Create the connection to the database
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "<p>Successfully connected to the database.</p>";

// Create users table
$sql1 = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);";
$QueryResult1 = mysqli_query($conn, $sql1);

if ($QueryResult1) {
    echo "<p>'users' table created or already exists.</p>";
} else {
    echo "<p>Error creating 'users' table: " . mysqli_error($conn) . "</p>";
}

// Create design_requests table
$sql2 = "CREATE TABLE IF NOT EXISTS design_requests (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    jewelry_type VARCHAR(50) NOT NULL,
    material TEXT NOT NULL,
    gemstones VARCHAR(50) NOT NULL,
    design_details TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);";
$QueryResult2 = mysqli_query($conn, $sql2);

if ($QueryResult2) {
    echo "<p>'design_requests' table created or already exists.</p>";
} else {
    echo "<p>Error creating 'design_requests' table: " . mysqli_error($conn) . "</p>";
}

// Create orders table
$sql3 = "CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    customer_name VARCHAR(100) NOT NULL,
    shipping_address TEXT NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    payment_method ENUM('Credit Card', 'Cash') NOT NULL,
    additional_requests TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);";
$QueryResult3 = mysqli_query($conn, $sql3);

if ($QueryResult3) {
    echo "<p>'orders' table created or already exists.</p>";
} else {
    echo "<p>Error creating 'orders' table: " . mysqli_error($conn) . "</p>";
}

// Create order_items table
$sql4 = "CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,  
    product_id INT,  
    product_description TEXT,
    product_price DECIMAL(10, 2),
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);";
$QueryResult4 = mysqli_query($conn, $sql4);

if ($QueryResult4) {
    echo "<p>'order_items' table created or already exists.</p>";
} else {
    echo "<p>Error creating 'order_items' table: " . mysqli_error($conn) . "</p>";
}

// Closing the connection
mysqli_close($conn);
?>
