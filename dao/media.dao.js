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
    var strQuery = "START TRANSACTION;"+
                "INSERT INTO Media (duration, name, frameRate, path, frameCount, description, resolution) VALUES ('"+mediaData.duration+"',"+
                                                                                                                    " '"+mediaData.name+"',"+
                                                                                                                    " '"+mediaData.frameRate+"',"+
                                                                                                                    " '"+mediaData.path+"',"+
                                                                                                                    " '"+mediaData.frameCount+"',"+
                                                                                                                    " '"+mediaData.description+"',"+
                                                                                                                    " '"+mediaData.resolution+"');";    
    strQuery = strQuery+"INSERT INTO Thumbnail (mediaId, path) VALUES ";                                                                                                                    
    mediaData.thumbnails.forEach(thumb => {
        strQuery = strQuery + "(LAST_INSERT_ID(),'"+thumb.path+"'),"
    });
    strQuery = strQuery+"COMMIT;";
    strQuery = strQuery.split(''); 
    strQuery.splice(strQuery.lastIndexOf(','),1,';'); 
    strQuery = strQuery.join(''); 
    db.query(strQuery, function(err) {
                callback(err);
    });
    
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


/**
 * find media by path list
 */
mediaDao.getByPathList = function(pathList,callback)
{
   
	 var query = "SELECT * FROM Media WHERE path IN ("+
                        (pathList.map(function(item) { return '?' })).join(",")
                        +")";

     db.query(query,
            pathList,
            function(err, rows) {
                callback(err, rows);               
    });

    db.end();
}

module.exports = mediaDao;