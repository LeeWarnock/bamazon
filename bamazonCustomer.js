var inquirer = require('inquirer');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Kelcy',
  database: 'bamazon_DB'
});

// connect to bamazon database
connection.connect(function(err) {

  if (err) throw err;

  console.log('connected as id ' + connection.threadId);
});
order();

function order(){
// display all of the items that are for sale: IDs, names, and price
  connection.query('SELECT * FROM Products',function(err,res){
  for(var i=0;i<res.length;i++){
    console.log('************************');
    console.log('Item ID: ' +res[i].ItemID);
    console.log('Product Name: ' +res[i].ProductName);
    console.log('Department Name: ' +res[i].DepartmentName);
    console.log('Best Price: ' +res[i].Price);
    console.log('Inventory: ' +res[i].StockQuantity);}
    console.log("-----------------------------------");})

  // prompt user to ask them the ID of the product they would like to buy

  inquirer.prompt([
    {
    type: "input",
    message: "What is the Item ID of the product you would like to buy?",
    name: "id"
    }, {
      type: "input",
      message: "How many would you like to purchase?",
      name: "amount"
    }]).then(function (answers) {

        connection.query('SELECT * FROM Products WHERE ProductName = ?', answers.itemId, function(err,res){
          if(err) throw err;



             // Check stock
            if (answers.quantity > res[0].StockQuantity){
            console.log("Sorry that item is currently out of stock");


            order();
          }
          // total amount due:
          else{
            var total = answers.quantity * res[0].Price

            console.log("Your total is "+answers.quantity +" "+ answers.itemId +" " +total +" dollars. Thank you for shopping at Bamazon!");

            //updates stock
            connection.query('UPDATE Products SET StockQuantity = "'+(res[0].StockQuantity - answers.quantity)+'" WHERE ProductName = "'+answers.itemId+'"');
          }
        })
});
}





