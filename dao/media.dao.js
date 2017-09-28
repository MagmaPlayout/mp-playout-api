var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
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
 *  get all medias
 */
mediaDao.listAll = function(callback)
{
    
    mapMediaObject(null, callback);

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
    mediaData.thumbnails = []
    var strQuery = 
                "INSERT INTO Media (duration, name, frameRate, path, frameCount, description, resolution, provider) VALUES ('"+mediaData.duration+"',"+
                                                                                                                    " '"+mediaData.name+"',"+
                                                                                                                    " '"+mediaData.frameRate+"',"+
                                                                                                                    " '"+mediaData.path+"',"+
                                                                                                                    " '"+mediaData.frameCount+"',"+
                                                                                                                    " '"+mediaData.description+"',"+
                                                                                                                    " '"+mediaData.resolution+"',"+
                                                                                                                    " '"+mediaData.provider+"');";  
    strQuery = strQuery+"SET @last_media_id = LAST_INSERT_ID();";
    strQuery = strQuery+"INSERT INTO Thumbnail (mediaId, path) VALUES ";                                                                                                                    
    mediaData.thumbnails.forEach(thumb => {
        strQuery = strQuery + "(@last_media_id,'"+thumb.path+"'),"
    });

  
    strQuery = strQuery.split(''); 
    strQuery.splice(strQuery.lastIndexOf(','),1,';');  //hack para la ultima coma convertirla en punto y coma
    strQuery = strQuery.join(''); 
    db.query(strQuery, function(err,result) {
        if(!err){   
            mediaData.id = result[0].info.insertId      
        }
        else{
            mediaData = null;
        }
        callback(err,mediaData);
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
	
    var whereClause = "name = " + name;

    mapMediaObject(whereClause,callback);
}


/**
 * find media by path list
 */
mediaDao.getByPathList = function(pathList,callback)
{
   
	 var whereClause = "path IN ("+
                        (pathList.map(function(item) { return '?' })).join(",")
                        +")";

     mapMediaObject(whereClause,callback);
}


/**
 * Private method
 * Map mediaInfo and thumbnails object to media
 * @param where(nullable) => SQL Conditional WHERE clause 
 */
// es lo unico que se me ocurree por ahora (es medio cabeza)
var mapMediaObject = function(whereClause, callback){ 
   
    var query = "SELECT m.*,"+ 
                    "mi.id AS mi_id, mi.mediaId AS mi_mediaId, mi.key, mi.value,"+
                    "t.id AS t_id, t.mediaId AS t_mediaId, t.path AS t_path " +
                "FROM Media m " +
                    "LEFT JOIN MediaInfo mi ON m.id = mi.mediaId "+
                    "LEFT JOIN Thumbnail t ON t.mediaId = m.id" +
                (whereClause == null  ? "" : "WHERE " + whereClause) 
                

    var mediaList = [];
    var thumbnailList = [];
    var mediaInfoList = [];

	db.query(query,
            function(err, rows) {
                //keep only unique media object
                mediaList = _.uniq(rows, 'id').map(function(media){
                    return {
                        id: media.id,
                        duration : media.duration,
                        name : media.name,
                        frameRate : media.frameRate,
                        path : media.path,
                        frameCount : media.frameCount,
                        description : media.description,
                        resolution : media.resolution,
                        thumbnails : [],
                        mediaInfo : []
                    }


                }) ;

                //keep only unique thumbnails object
                thumbnailList = _.unique(rows,"t_id").map(function(item){
                    return {
                        id : item.t_id,
                        path : item.t_path,
                        mediaId : item.t_mediaId
                    }
                });

                //keep only unique mediaInfo object
                mediaInfoList = _.unique(rows,"mi_id").map(function(item){
                   
                    return {
                        id : item.mi_id,
                        key : item.key,
                        value : item.value,
                        mediaId : item.mi_mediaId
                    }
                });
               
                //get thumbnails for each media
                mediaList.forEach(media => 
                    thumbnailList.forEach(function(thumb){
                        if(media.id == thumb.mediaId)
                            media.thumbnails.push({
                                id : thumb.id,
                                path : thumb.path
                            });
                        
                    })
                );

                 //get mediaInfo for each media
                mediaList.forEach(media => 
                    mediaInfoList.forEach(function(mi){
                        if(media.id == mi.mediaId)
                            media.mediaInfo.push({
                                id : mi.id,
                                key : mi.key,
                                value : mi.value
                            });                       
                    })
                );
               
                callback(err, mediaList);
    });

    db.end();


}

module.exports = mediaDao;