var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
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
        // connection.end();
    });
}


// function rangeSearch() {
//     inquirer
//         .prompt([
//             {
//                 name: "id",
//                 type: "input",
//                 message: "Enter the id of the product you'd like to buy: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "Quantity",
//                 type: "input",
//                 message: "Enter the quantity you wish to purchase: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//             connection.query(query, [answer.start, answer.end], function (err, res) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         "Position: " +
//                         res[i].position +
//                         " || Song: " +
//                         res[i].song +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Year: " +
//                         res[i].year
//                     );
//                 }
//                 runSearch();
//             });
//         });
// }


