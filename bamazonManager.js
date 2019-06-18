var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.MYSQL_Password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayOptions();
});

//use inquirer to display menu options
function displayOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which menu option would you like to choose?",
                choices: ["View Products for Sale"
                    , "View Low Inventory"
                    , "Add to Inventory"
                    , "Add New Product"],
                name: "choice"
            },
        ])
        .then(function (answer) {
            switch (answer.choice) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory(); //need to write this function
                    break;
                case "Add New Product":
                    addProduct(); //need to write this function
                    break;
            }
        });
}


function viewProducts() {
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
                " || Department: " +
                res[i].department_name +
                " || Price: " +
                res[i].price +
                " || Quantity: " +
                res[i].stock_quantity
            );
        }
        connection.end();
    });
}

function lowInventory() {
    console.log("Selecting all products with quantity < 5...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5"
        , function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log("Low Inventory Products: ");
            for (i = 0; i < res.length; i++) {
                console.log(
                    " || Product ID: " +
                    res[i].item_id +
                    " || Product Name: " +
                    res[i].product_name +
                    " || Department: " +
                    res[i].department_name +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock_quantity
                );
            }
            connection.end();
        });
}

