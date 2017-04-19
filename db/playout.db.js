/*
 * ███╗   ███╗██████╗       ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
 * ████╗ ████║██╔══██╗      ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
 * ██╔████╔██║██████╔╝█████╗██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗  
 * ██║╚██╔╝██║██╔═══╝ ╚════╝██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  
 * ██║ ╚═╝ ██║██║           ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
 * ╚═╝     ╚═╝╚═╝           ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
 */

var fs = require("fs");
var file = "./db/db_playout.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose(),
db_playout = new sqlite3.Database(file);

fs.readFile('db_playout.sql', 'utf8', function (err,sql_content) {
  if (err) {
    return console.log(err);
  }
  console.log(sql_content);
});

db_playout.serialize(function() {
  if(!exists) {

  	console.log("Creating tables at db_playout");
    db_playout.run(sql_content);
	setup(db_playout);
  }
});

module.exports = db_playout;