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
    var whereClause = " p.id = " + id;
    
    mapPieceObject(whereClause, function(err,resp){
        callback(err,resp[0]);
    });
	
}


/**
 *  get all pieces
 */
pieceDao.listAll = function(callback)
{
    
    mapPieceObject(null, callback);

}


/**
 * update a piece
 */
pieceDao.update= function(pieceData,callback)
{
    //var pieceOld = pieceDao.getById(pieceData.id);
    //console.log("piece olddddddddddddddddddddddddd")
    //console.log(pieceOld)
	var strQuery = "START TRANSACTION;"+
                    "UPDATE Piece  SET name = :name "+
                    "WHERE id = :id ;";
     
     //si hubo cambios en la lista de tags
    if(pieceData.tagList.length > 0){
        strQuery = strQuery + "DELETE FROM TagPieces WHERE pieceId =" + pieceData.id + "; ";
        strQuery = strQuery+"INSERT INTO TagPieces (pieceId, tagId) VALUES ";                                                                                                                    
        pieceData.tagList.forEach(tag => {
            strQuery =  strQuery + "(" + pieceData.id + ", " + tag.id +"),"
        });

        strQuery = strQuery+ "; ";

    }

    //si hubo cambios en la lista de filterConfig
    if(pieceData.filterConfigList.length > 0 ){
        strQuery = strQuery + "DELETE FROM FilterConfig WHERE pieceId =" + pieceData.id + "; ";
        strQuery = strQuery+"INSERT INTO FilterConfig (pieceId, filterId, filterArgId, value, filterIndex) VALUES ";    
        pieceData.filterConfigList.forEach(filConfig => {
            strQuery = strQuery + "(" + pieceData.id + ", "+ filConfig.filterId +", "+ filConfig.filterArgId + ", '" + filConfig.value + "', " + filConfig.filterIndex +"),"
        });
        strQuery = strQuery+ "; ";
        
    }
    strQuery = strQuery + "COMMIT;";
    strQuery = strQuery.replace("),;", ");");
    strQuery = strQuery.replace("),;", ");");

    
    db.query( strQuery,
                pieceData             
                , 
                function(err, result) { 
                    callback(err, result);
                }
    );
    
    db.end();
}


/**
 * insert new piece
 */
pieceDao.insert = function(pieceData, callback)
{
    var strQuery = "START TRANSACTION;"+
                    "INSERT INTO Piece (name, mediaId, resolution, duration, path, frameCount, frameRate) "+
                    "VALUES (:name,:mediaId,:resolution,:duration,:path,:frameCount,:frameRate); ",
    strQuery = strQuery + "SET @lastInsertedId = LAST_INSERT_ID();  "
    
    //guardo todos los tags del piece
    if(pieceData.tagList.length > 0 ){
        strQuery = strQuery+"INSERT INTO TagPieces (pieceId, tagId) VALUES ";                                                                                                                    
        pieceData.tagList.forEach(tag => {
            strQuery = strQuery + "(@lastInsertedId,'"+ tag.id +"'),"
        });
        strQuery = strQuery+ "; ";

    }
   
    //guardo todos los filters del piece
    if(pieceData.filterConfigList.length > 0 ){
        strQuery = strQuery+"INSERT INTO FilterConfig (pieceId, filterId, filterArgId, value, filterIndex) VALUES ";                                                                                                                    
        pieceData.filterConfigList.forEach(filConfig => {
            strQuery = strQuery + "(@lastInsertedId," + filConfig.filterId + ", "+ filConfig.filterArgId + ", '" + filConfig.value + "', " + filConfig.filterIndex +"),"
        });
        strQuery = strQuery + "; ";
    }

    strQuery = strQuery + "COMMIT;";
    strQuery = strQuery.replace("),;", ");");
    strQuery = strQuery.replace("),;", ");");

    db.query( strQuery,
              
                {
                    name : pieceData.name, 
                    mediaId : pieceData.mediaId, 
                    resolution : pieceData.resolution,
                    duration : pieceData.duration,
                    path : pieceData.path,
                    frameCount : pieceData.frameCount,
                    frameRate : pieceData.frameRate
                }              
                , 
                function(err, result) { 
                    if(!err && result[1].info.affectedRows > 0 ){
                        pieceDao.getById(result[1].info.insertId, function(err,resp){
                            console.log("get by idddd");
                            console.log(resp);
                            if(!err)
                                pieceData = resp;
                            else
                                pieceData = null;
                            callback(err,pieceData);
                        }); 
                    }                                                 
                    else{
                        pieceData = null;
                        callback(err,pieceData);
                    }                
                }
    );
    
    db.end();
}


/**
 * delete a piece
 * 
 */
pieceDao.delete = function(id, callback)
{
    var strQuery = "START TRANSACTION;";
    
    //elimino todos sus tags
    strQuery = strQuery+"DELETE FROM TagPieces WHERE pieceId = " + id +"; " 

     //elimino todos sus filtros configurados
    strQuery = strQuery+"DELETE FROM FilterConfig WHERE pieceId = " + id +"; " 

    strQuery = strQuery + "DELETE FROM Piece WHERE id =" + id + "; ";    
    
    strQuery = strQuery + "COMMIT;";
    

	db.query(strQuery, 
                function(err, result) {
                    console.log(result);
                    callback(err, result);
                }
    );
    
    db.end();
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
 * Private method
 * Map pieceInfo and thumbnails object to piece
 * @param where(nullable) => SQL Conditional WHERE clause 
 */
// es lo unico que se me ocurree por ahora (es medio cabeza)
var mapPieceObject = function(whereClause, callback){ 
   
   //to-do -> mapear filterArgs
    var query = "SELECT	m.*,"+
                    "p.id AS p_id,p.name AS p_name, p.duration AS p_duration, p.path AS p_path,"+
                    "p.resolution AS p_resolution, p.mediaId AS p_mediaId,"+
                    "p.frameRate AS p_frameRate, p.frameCount AS p_frameCount,"+
                    "mi.id AS mi_id, mi.mediaId AS mi_mediaId, mi.key, mi.value,"+
                    "t.id AS t_id, t.mediaId AS t_mediaId, t.path AS t_path, "+
                    "fc.id AS fc_id, fc.filterId AS fc_filterId, fc.pieceId AS fc_pieceId, fc.filterArgId, fc.value AS fc_value, fc.filterIndex, " +
                    "fil.id AS fil_id, fil.name AS fil_name, fil.description AS fil_description, " + 
                    "tp.id AS tp_id, tp.pieceId AS tp_pieceId, tp.tagId AS tp_tagId, " +
                    "tag.id AS tag_id, tag.tag " +
                "FROM Piece p "+
                    "INNER JOIN Media m ON m.id = p.mediaId "+
                    "LEFT JOIN MediaInfo mi ON mi.mediaId = p.mediaId "+
                    "LEFT JOIN Thumbnail t ON t.mediaId = p.mediaId "+
                    "LEFT JOIN TagPieces tp ON tp.pieceId = p.id " +
					"LEFT JOIN Tags tag ON tag.id = tp.tagId " +
                    "LEFT JOIN FilterConfig fc ON fc.pieceId = p.id " +
					"LEFT JOIN Filter fil ON fil.id = fc.filterId "+
                (whereClause == null  ? "" : " WHERE " + whereClause) +
                " ORDER BY p.name "
                

    var pieceList = [];
    var mediaList = [];
    var thumbnailList = [];
    var mediaInfoList = [];
    var tagList = [];
    var filterConfigList = [];

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
                        media : null,
                        tagList : [],
                        filterConfigList : []                     
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

                //keep only unique tag object
                tagList = _.unique(rows,"tp_id").map(function(item){
                   
                    return {
                        id : item.tag_id,
                        tag: item.tag,
                        pieceId : item.tp_pieceId
                    }
                });

                //keep only unique tag object
                filterConfigList = _.unique(rows,"fc_id").map(function(item){
                   
                    return {
                        id : item.fc_id,
                        filterId: item.fc_filterId,
                        pieceId : item.fc_pieceId,
                        filterArgId : item.filterArgId,
                        value : item.fc_value,
                        filterIndex : item.filterIndex,
                        filter : {
                            id : item.fil_id,
                            name : item.fil_name,
                            description : item.fil_description
                            //to-do -> falta lista de FilterArg
                        }
                       

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

                //get tags for each piece
                pieceList.forEach(piece => 
                    tagList.forEach(function(tag){
                        if(piece.id == tag.pieceId)
                            piece.tagList.push({
                                id : tag.id,
                                tag: tag.tag
                            });
                        
                    })
                );

                //get tags for each media
                pieceList.forEach(piece => 
                    filterConfigList.forEach(function(fc){
                        if(piece.id == fc.pieceId)
                            piece.filterConfigList.push({
                                id : fc.id,
                                filterId: fc.filterId,
                                pieceId : fc.pieceId,
                                filterArgId : fc.filterArgId,
                                value : fc.value,
                                filterIndex : fc.filterIndex,
                                filter : fc.filter
                            });
                        
                    })
                );

          
                callback(err, pieceList);
    });

    db.end();
}


/**
 * Get all pieces that don't have a filter
 */
pieceDao.getAllWithOutFilter = function (callback) {
    db.query("SELECT DISTINCT p.* " +
                "FROM Piece p" + 
                "LEFT JOIN FilterConfig fc ON fc.pieceId = p.id "+
                "WHERE fc.id IS NULL",
        function (err, rows) {
            callback(err, rows);
        }
    );

    db.end();
};

/**
 * Check if piece has filters
 */
pieceDao.hasFilter = function (id, callback) {
    db.query("SELECT DISTINCT p.* " +
                "FROM Piece p " + 
                "LEFT JOIN FilterConfig fc ON fc.pieceId = p.id "+
                "WHERE p.id = ? AND fc.id IS NULL",
                [id],
        function (err, rows) {
            console.log(err);
            console.log(rows);
            callback(err, rows.length > 0 ? false : true);
        }
    );

    db.end();
};


module.exports = pieceDao;