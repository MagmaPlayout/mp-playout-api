/*==================================
----- magma-playout admin db -------
==================================*/

var fs = require("fs");
var file = "./db/mp_admin.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose(),
db_mpadmin = new sqlite3.Database(file);

//TO-DO : create table scripts of the model.
db_mpadmin.serialize(function() {
  if(!exists) {
    db_mpadmin.run("DROP TABLE IF EXISTS Users");
	db_mpadmin.run("CREATE TABLE IF NOT EXISTS " +
			"Users ("+
				"id INTEGER PRIMARY KEY AUTOINCREMENT," + 
				"name TEXT, " +
				"surname TEXT," +
				"username TEXT," +
				"password TEXT," +
				"email TEXT," +
				"phone TEXT" +
				")"
			);
	console.log("User table created successfully");

	setup(db_mpadmin);
  }
});


/*==================================
-------- initial setup -------------
==================================*/
function setup(db){

	var stmt = db.prepare("INSERT INTO Users VALUES (?,?,?,?,?,?,?)");
	
	stmt.run(
			null,
			"Luis", 
			"Muñoz", 
			"luis", 
			"luis",
			null,
			null
			);

	stmt.run(
			null,
			"Iber", 
			"Parodi", 
			"iber", 
			"iber",
			null,
			null
			);

	stmt.run(
			null,
			"Franco", 
			"Magrini", 
			"franco", 
			"franco",
			null,
			null
			);

	stmt.finalize();


}

module.exports = db_mpadmin;