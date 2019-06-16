DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id AUTO INCREMENT INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(16,6) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);





