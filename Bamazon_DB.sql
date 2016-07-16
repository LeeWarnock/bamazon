create database Bamazon_DB;

use Bamazon_DB;

CREATE TABLE Products(
  ItemId integer not null auto_increment,
  ProductName varchar(50) null,
  DepartmentName varchar(50) not null,
  Price integer not null,
  StockQuantity integer not null,
  PRIMARY KEY (`id`));
  
	INSERT INTO Products (id, ProductName,DepartmentName,Price, StockQuantity) VALUES 
(1,'My Butt, Your Butt: A Novella Signed First Edition','Books', 49.99, 669);
(2,'30 LB Bag of assorted Watch Parts','Electronics', 22.69, 9999);
(3,'Farm Fresh Dolphin Milk - 55 Gallon size','Grocery', 6999.66, 69);
(4,'Deep Thoughts by Jack Handey','Books', 9.99, 843);
(5,'A Teen''s Guide to Meaningful Glances By Stephen R. Covey','Books', 59.99, 70001);
(6,'Willfull Meditation for the Unwilling, VOL 4','Media', 19.99, 666);
(7,'700 Novelty Screams','Media', 11.99, 21);
(8,'Clapping Hands Hat','Clothing', 9.99, 398);
(9,'Lycra Full-Body Unitard: Green','clothing', 929.99, 132);
(10,'Nuts&Gum - 1LB','Grocery', 9.99, 33);
