var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Millions",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});


function displayProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Available Products: ");
        for (i = 0; i < res.length; i++) {
            console.log(
                " || Product ID: " +
                res[i].item_id +
                " || Product Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price
            );
        }
        buyProduct();
        // connection.end();
    });
}


function buyProduct() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the id of the product you'd like to buy: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter the quantity you wish to purchase: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = "SELECT item_id, stock_quantity, price FROM products WHERE item_id = " + answer.id;
            connection.query(query, function (err, res) {
                if (err) throw err;
                if (res[0].stock_quantity - answer.quantity < 0) {
                    console.log("Insufficient Quantity! Please modify your order");
                    buyProduct();
                } else {
                    var originalQty = res[0].stock_quantity;
                    fulfillOrder(answer.id, answer.quantity, originalQty);
                    console.log(res);
                    console.log("answer quantity is: " + answer.quantity);
                    console.log("price is: " + res[0].price);
                    console.log("Your total order is: $" + answer.quantity * res[0].price);
                }
            });
        });
}


function fulfillOrder(id, orderQty, originalQty) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: originalQty - orderQty
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated\n");
        }
    );
    // logs the actual query being run
    console.log(query.sql);
    connection.end();

}

