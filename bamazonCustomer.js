var inquirer = require('inquirer');
var mysql = require('mysql');

var name = "";
var quantity = 0;
var price = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id: " + connection.threadId);
	showAllItems();
	itemSelection();
});


function showAllItems() {
	connection.query("SELECT * FROM products ", function(err, res) {
		console.log(res);
		// connection.end();
	});
}


function itemSelection() {

	inquirer.prompt({
		name: "name",
		type: "input",
		message: "What item do you want to purchase?"
	})

	.then(function(answer) {
		name = answer.name;
		    connection.query(`SELECT * FROM products WHERE product_name = "${name}"`, function(err, res) {
			availableCount = res[0].stock_quantity;
			if (err) {
				console.log(err)
			} 
		});
				inquirer.prompt({
					name: "quantity",
					type: "input",
					message: "How Many Units Do You Want to Purchase?",
					validate: function(value) {
		          if (isNaN(value) === false) {
		            return true;
		          }
		          return false;
		        }
		      })
				.then(function(answer) {
					var query = connection.query(`SELECT * FROM products WHERE product_name = "${name}"`, function(err, res) {
					//name = answer.name;
					quantity = answer.quantity;

					availableCount = res[0].stock_quantity;
					newQuantity = availableCount - quantity;
					price = res[0].price;

					if (err) {
						console.log(err)
					} 

					if(availableCount < quantity) {
						console.log("There's Not Enough Available!");
						connection.end();
					}

					else {

						 connection.query("UPDATE products SET stock_quantity = '" + newQuantity + "' WHERE product_name = '" + name + "'", function(err, res) {
						 	// console.log("UPDATE products SET stock_quantity = '" + newQuantity + "' WHERE product_name = '" + name + "'");
						 	console.log("Your Total Cost is: $" + (quantity * price));
						 	connection.end();
						 }); 
						
				
				};
			});
		});
	});

};


	