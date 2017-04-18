var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');

var userDao = {}

/**
 * insert new user
 */
userDao.insertUser = function(userData)
{
	var stmt = db.prepare("INSERT INTO Users VALUES (?,?,?,?,?,?,?)");
	stmt.run(
			null,
			userData.name, 
			userData.surname, 
			userData.username, 
			userData.password,
			userData.email,
			userData.phone
			);
	stmt.finalize();
	console.log("User saved successfully");
}

/**
 * find user by username and password
 */
userDao.findUser = function(usr,pass,callback)
{
	stmt = db.prepare("SELECT * FROM Users WHERE username = ? AND password = ?");
    
    stmt.bind(usr, pass); 
    
    stmt.get(function(error, row)
    {
    	if(error) 
        {
            throw err;
        } 
        else 
        {
        	//retornamos la fila con los datos del usuario
            if(row) 
            {
                callback("", row);
            }
            else
            {
				callback("", false);
            	console.log("user not exists");
            }
        }
    });
}

/**
 * find user by id
 */
userDao.findById = function(id)
{
	stmt = db.prepare("SELECT * FROM Users WHERE id = ?");
    
    stmt.bind(id); 
    
    stmt.get(function(error, row)
    {
    	if(error) 
        {
            throw err;
        } 
        else 
        {
        	//return user data
            if(row) 
            {
                callback("", row);
            }
            else
            {
				callback("", false);
            	console.log("user not exists");
            }
        }
    });
}

module.exports = userDao;