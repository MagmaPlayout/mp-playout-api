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
mediaDao.insert = function(mediaData, callback)
{
    console.log("INSERT INTO Media VALUES (%s, %s, %s, %s, %s, %s, %s)", mediaData.name, mediaData.duration, mediaData.path, mediaData.frameRate, mediaData.frameCount, mediaData.description, mediaData.resolution);
    db.query("INSERT INTO Media (duration, name, frameRate, path, frameCount, description, resolution) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [mediaData.duration, mediaData.name, mediaData.frameRate, mediaData.path, mediaData.frameCount, mediaData.description, mediaData.resolution],
            function(err) {
                callback(err);
    });
    // console.log(mediaData.thumbnails);
    // TODO: Luego de insertar el Media, debo iterar el array 'mediaData.thumbnails' y hacer un INSERT INTO Thumbnails por cada objeto dentro del array
    // referenciando a la ID del Media que acabo de insertar. MySql -> LAST_INSERT_ID() 

    db.end();
	//return null;
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