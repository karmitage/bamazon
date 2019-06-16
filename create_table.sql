DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(16,6) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Hammock","Outdoor Gear",40.00,27)
,("Mocha Pot","Home Goods",18.00,44)
,("Ice Cream Maker","Home Goods",35.00,5)
,("Tent","Outdoor Gear",140.00,9)
,("Facial Moisturizer","Health and Beauty",20.00,30)
,("Curling Iron","Health and Beauty",40.00,2)
,("Women's Pants (size 6)","Clothing",50.00,11)
,("Rake","Outdoor Gear",19.00,17)
,("Glass Pitcher","Home Goods",20.00,25)
,("Moby Dick","Books",15.00,6);


select * from products;

