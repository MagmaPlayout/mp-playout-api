var db = require('../db/playout.db');

var sketchDao = {}


/**
 * find sketch by id
 */
sketchDao.getById = function(id,callback)
{
	 db.query("SELECT * FROM Sketch WHERE id= ?",
            [id],
            function(err, rows) {
                callback(err, rows[0]);
    });

    db.end();
}


/**
 * find sketch by id
 */
sketchDao.listAll = function(callback)
{
	 db.query("SELECT * FROM Sketch",
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}


/**
 * insert new sketch
 */
sketchDao.update= function(sketchData)
{
	return null;
}


/**
 * insert new sketch
 */
sketchDao.insert = function(sketchData)
{
	return null;
}


/**
 * delete a sketch
 */
sketchDao.delete = function(id)
{
	return null;
}

module.exports = sketchDao;