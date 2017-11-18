USE bamazon;

CREATE TABLE products(

	item_id INT NOT NULL,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,3) NULL,
	stock_quantity INT NULL,
);



INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES ("Silly Putty", "Toy", .50, 200), ("Silly String", "Party", 2.00, 155), ("Leather Gloves", "Outdoor Apparel", 105.00, 170), ("Velcro Walllet", "Travel", 25.00, 220), ("Canned Spinach", "Grocery", 1.50, 600), ("Head of Lettuce", "Grocery", .75, 420), ("OLED Curved HD TV", "Electronics", 1299.85, 50), ("Harman Kardon Soundsticks", "Home Theatre", 200.00, 200), ("Vanilla Scented Candle", "Home Goods", 21.00, 200), ("Stainless Steel Towel Rack", "Home Goods", 72.00, 330);
