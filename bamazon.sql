CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Video Game', 'Electronics', 35.75, 654),
		('Pencils', 'Stationary', 1.10, 456),
		('Shirt', 'Clothing', 15.75, 215),
		('Pants', 'Clothing', 55.25, 485),
		('Chef Knife', 'Kitchen', 56.35, 156),
		('Garden Hose', 'Outdoors', 19.99, 1456),
		('Bowls', 'Kitchen', 69.36, 7864),
		('Candy', 'Grocery', 1.50, 20045),
		('Diapers', 'Children', 45.75, 652),
		('Paper Towels', 'Grocery', 6.99, 87),
		('Baby Wipes', 'Children', 3.50, 45),
		('Socks', 'Clothing', 5.99, 4875),
		('Loafers', 'Shoes', 124.99, 1562),
		('Dog Food', 'Pets', 45.89, 15464),
		('Scissors', 'Stationary', 5.10, 4987),
		('Vitamins', 'Health', 17.25, 4567),
		('Dried Spices', 'Grocery', 3.99, 78561),
		('Tylenol', 'Pharmacy', 7.56, 7844),
		('Power cord', 'Electronics', 10.99, 47895),
		('Plant Food', 'Outdoors', 18.99, 7563);
