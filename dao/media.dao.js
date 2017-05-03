var db = require('../db/playout.db');

var mediaDao = {}


/**
 * find media by id
 */
mediaDao.getById = function(id,callback)
{
	 db.query("SELECT * FROM Media WHERE id= ?",
            [id],
            function(err, rows) {
                callback(err, rows[0]);
    });

    db.end();
}


/**
 * find media by id
 */
mediaDao.listAll = function(callback)
{
	 db.query("SELECT * FROM Media",
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}


/**
 * insert new media
 */
mediaDao.update= function(mediaData)
{
	return null;
}


/**
 * insert new media
 */
mediaDao.insert = function(mediaData)
{
	return null;
}


/**
 * delete a media
 */
mediaDao.delete = function(id)
{
	return null;
}



/**
 * find media by name
 */
mediaDao.getByName = function(name,callback)
{
	 db.query("SELECT * FROM Media WHERE name= ?",
            [name],
            function(err, rows) {
                callback(err, rows);               
    });

    db.end();
}
module.exports = mediaDao;