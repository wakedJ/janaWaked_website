<?php
include 'config.php';
if ($con){
    //creating design_requests table
     $sql1 = "CREATE TABLE IF NOT EXISTS design_requests (
        id INT(11) NOT NULL AUTO_INCREMENT,
        jewelry_type VARCHAR(50) NOT NULL,
        material TEXT NOT NULL,
        gemstones VARCHAR(50) NOT NULL,
        design_details TEXT NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        PRIMARY KEY (id) );";

    $QueryResult1 = mysqli_query($conn , $sql1)//sends the SQL query to the MySQL database using ($conn).
    or die ("Unable to execute the query for 'design_requests':".mysqli_error($conn));

    // create users table 
    $sql2 = "CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id) )";

    $QueryResult2 = mysqli_query($conn , $sql2)
    or die ("Unable to execute the query for 'users':".mysqli_error($conn));

    //create order table
    $sql3 = "CREATE TABLE IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL, -- will be referenced to the 'id' column in the users table
        customer_name VARCHAR(100) NOT NULL,
        shipping_address TEXT NOT NULL,
        phone_number INT(8) NOT NULL,
        payment_method ENUM('Credit Card', 'Cash') NOT NULL,
        additional_requests TEXT,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(user_id)  -- Establish the relationship with the users table
    );";

    $QueryResult3 = mysqli_query($conn , $sql3)
    or die ("Unable to execute the query for 'orders':".mysqli_error($conn));

    //create order-items table
    $sql4 = "CREATE TABLE order_items (
        order_item_id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,  -- will be referenced to the 'id' column in the orders table
        product_id INT,  -- This should reference a product in your catalog (if you have a products table)
        product_description TEXT,
        product_price DECIMAL(10, 2),
        quantity INT,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)  -- Link to the orders table
    );";
}
mysqli_close($conn);
?>
