var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',
	password: '',
	database: 'Bamazon'
});


function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Invalid number.';
	}
}

function promptPurchase() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter item ID.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid ID');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Order placed');

					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
	
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Order fulfilled! Total amount $' + productData.price * quantity);
						console.log("\n-------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Insufficient quantity');
					console.log("\n----------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Inventory: ');
		console.log('----------------\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  --  ';
			strOut += 'Product Name: ' + data[i].product_name + '  --  ';
			strOut += 'Department: ' + data[i].department_name + '  --  ';
			strOut += 'Price: $' + data[i].price + ' -- ';
			strOut += 'Stock: ' + data[i].stock_quantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	promptPurchase();
	})
}

function runBamazon() {

	displayInventory();
}

runBamazon();