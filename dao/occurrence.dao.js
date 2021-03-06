var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var occurrenceDao = {}


/**
 * find occurrence by id
 */
occurrenceDao.getById = function(id,callback)
{

	db.query("SELECT o.*, p.name, p.duration " +
            "FROM Occurrence o " +
            "INNER JOIN Piece p on p.id = o.pieceId " +
            "WHERE o.id = ? ",
            [id],           
            function(err, rows) {

                var occurrenceMap = rows == null ? null : rows.map(function(item){
                    return {
                        id : item.id,
                        playlistId : item.playlistId, 
                        pieceId : item.pieceId, 
                        startDateTime : item.startDateTime,
                        piece : {
                            id : item.pieceId,
                            name : item.name,
                            duration : item.duration
                        }
                        
                    }
                });

                callback(err, occurrenceMap[0]);
            }
    );

    db.end();
}


/**
 *  get all occurrences
 */
occurrenceDao.listAll = function(callback)
{
    
   db.query("SELECT o.*, p.name, p.duration, p.path, p.frameRate, p.frameCount "+
            "FROM Occurrence o "+
            "INNER JOIN Piece p on p.id = o.pieceId "+
            "ORDER BY o.startDateTime",           
            function(err, rows) {

                var occurrenceMap = rows == null ? null : rows.map(function(item){
                    return {
                        id : item.id,
                        playlistId : item.playlistId, 
                        pieceId : item.pieceId, 
                        startDateTime : item.startDateTime,
                        piece : {
                            id : item.pieceId,
                            name : item.name,
                            duration : item.duration,
                            path: item.path,
                            frameRate : item.frameRate,
                            frameCount : item.frameCount
                        }
                        
                    }
                });

                callback(err, occurrenceMap);
            }
    );

    db.end();

}


/**
 * update an occurrence
 */
occurrenceDao.update= function(occurrenceData,callback)
{
	 db.query("UPDATE Occurrence SET playlistId = :playlistId,"+ 
                    "pieceId = :pieceId, startDateTime = :startDateTime " +
                "WHERE id = :id",
                {
                    playlistId : occurrenceData.playlistId, 
                    pieceId : occurrenceData.pieceId, 
                    startDateTime : occurrenceData.startDateTime,
                    id : parseInt(occurrenceData.id)
                }, 
                function(err, result) {
                    callback(err, result);
                }
    );
    
    db.end();
}


/**
 * insert new occurrence
 * @returns {OcurrenceModel} last inserted
 */
occurrenceDao.insert = function(occurrenceData, callback)
{

    db.query(
                "INSERT INTO Occurrence (playlistId, pieceId, startDateTime) "+
                "VALUES (:playlistId,:pieceId,:startDateTime) ",
              
                {
                    playlistId : occurrenceData.playlistId, 
                    pieceId : occurrenceData.pieceId, 
                    startDateTime : occurrenceData.startDateTime
                }              
                , 
                function(err,result) {  
                    if(!err){
                        occurrenceData.id = result.info.insertId
                    }                                                 
                    else{
                        occurrenceData = null;
                    }
                    callback(err,occurrenceData);
                }
   );
    
    db.end();
}


/**
 * delete an occurrence
 */
occurrenceDao.delete = function(id,callback)
{
	db.query("DELETE FROM Occurrence WHERE id = :id",
                {
                   id : id
                }, 
                function(err, result) {
                    console.log(result);
                    callback(err, result);
                }
    );
    
    db.end();
}


module.exports = occurrenceDao;