var mysql = require('mysql');
var inquirer = require('inquirer');
// connecting to bamazon_db
var connection=mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
})
//checks connection
connection.connect(function(err){
    if(err) throw err;
    console.log('')
    console.log("Welcome to Bamazon!!");
    console.log('');})


//runs the order function

order();

function order(){
  connection.query('SELECT * FROM Products',function(err,res){
  for(var i=0;i<res.length;i++){
  	console.log('************************');
    console.log('Product Name:' +res[i].ProductName);  	
    console.log('Department Name:' +res[i].DepartmentName);
    console.log('Best Price:' +res[i].Price);
    console.log('Inventory:' +res[i].StockQuantity);} 
    console.log("-----------------------------------");})

     inquirer.prompt([{
        type: 'input',
        message: 'Which item would you like to purchase today?',
        name: 'itemId'
       },{
       	type:'input',
       	message: 'How many would you like?',
       	name: 'quantity'
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