var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var pieceDao = {}


/**
 * find piece by id
 */
pieceDao.getById = function(id,callback)
{

	db.query("SELECT * FROM Piece WHERE id= ?",
            [id],
            function(err, rows) {
                callback(err, rows[0]);
    });

    db.end();
}


/**
 *  get all pieces
 */
pieceDao.listAll = function(callback)
{
    
    mapPieceObject(null, callback);

}


/**
 * insert new piece
 */
pieceDao.update= function(pieceData)
{
	return null;
}


/**
 * insert new piece
 */
pieceDao.insert = function(pieceData, callback)
{
     db.query(
                "INSERT INTO Piece (name, mediaId, resolution, duration, path, filterId, frameCount, frameRate) "+
                "VALUES (:name,:mediaId,:resolution,:duration,:path,:filterId,:frameCount,:frameRate) ",
              
                {
                    name : pieceData.name, 
                    mediaId : pieceData.mediaId, 
                    resolution : pieceData.resolution,
                    duration : pieceData.duration,
                    path : pieceData.path,
                    filterId : pieceData.filterId,
                    frameCount : pieceData.frameCount,
                    frameRate : pieceData.frameRate
                }              
                , 
                function(err,result) {                                                   
                    pieceData.id = result.info.insertId
                    callback(err,pieceData);
                }
    );
    
    db.end();
}


/**
 * delete a piece (Not implemented)
 * 
 */
pieceDao.delete = function(id)
{
	return null;
}



/**
 * find piece by name
 */
pieceDao.getByName = function(name,callback)
{
	
    var whereClause = "name = " + name;

    mapPieceObject(whereClause,callback);
}


/**
 * find piece by path list
 * @param {List<string>} pathList 
 */
pieceDao.getByPathList = function(pathList,callback)
{
    db.query("SELECT * FROM Piece WHERE path IN ("+
                        (pathList.map(function(item) { return '?' })).join(",")
                        +")",
            function(err, rows) {
                callback(err, rows);
    });

}


/**
 * Private method
 * Map pieceInfo and thumbnails object to piece
 * @param where(nullable) => SQL Conditional WHERE clause 
 */
// es lo unico que se me ocurree por ahora (es medio cabeza)
var mapPieceObject = function(whereClause, callback){ 
   
    var query = "SELECT	m.*,"+
                    "p.id AS p_id,p.name AS p_name, p.duration AS p_duration, p.path AS p_path,"+
                    "p.resolution AS p_resolution, p.mediaId AS p_mediaId,"+
                    "p.frameRate AS p_frameRate, p.frameCount AS p_frameCount,"+
                    "mi.id AS mi_id, mi.mediaId AS mi_mediaId, mi.key, mi.value,"+
                    "t.id AS t_id, t.mediaId AS t_mediaId, t.path AS t_path "+
                "FROM Piece p "+
                    "INNER JOIN Media m ON m.id = p.mediaId "+
                    "LEFT JOIN MediaInfo mi ON mi.mediaId = p.mediaId "+
                    "LEFT JOIN Thumbnail t ON t.mediaId = p.mediaId "+
                (whereClause == null  ? "" : "WHERE " + whereClause) 
                

    var pieceList = [];
    var mediaList = [];
    var thumbnailList = [];
    var mediaInfoList = [];

	db.query(query,
            function(err, rows) {
                
                //keep only unique piece object
                pieceList = _.unique(rows,"p_id").map(function(item){
                    return {
                        id : item.p_id,
                        name : item.p_name,
                        path : item.p_path,
                        duration : item.p_duration,
                        resolution : item.p_resolution,
                        frameRate : item.p_frameRate,
                        frameCount : item.p_frameCount,
                        mediaId : item.p_mediaId,                       
                        media : null                       
                    }
                });
                
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
               
                
                //match media/piece
                pieceList.forEach(piece => 
                    mediaList.forEach(function(m){
                        if(piece.mediaId == m.id)
                            piece.media = m          
                    })
                );
          
                callback(err, pieceList);
    });

    db.end();


}

module.exports = pieceDao;