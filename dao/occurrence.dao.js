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

	db.query("SELECT * FROM Occurrence WHERE id= ?",
            [id],
            function(err, rows) {
                callback(err, rows[0]);
    });

    db.end();
}


/**
 *  get all occurrences
 */
occurrenceDao.listAll = function(callback)
{
    
   db.query("SELECT * FROM Occurrence",           
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}


/**
 * insert new occurrence
 */
occurrenceDao.update= function(occurrenceData,callback)
{
	 db.query("UPDATE Occurrence SET playlistId = :playlistId,"+ 
                    "pieceId = :pieceId, startDateTime = :startDateTime, filterId = :filterId " +
                "WHERE id = :id",
                {
                    playlistId : occurrenceData.playlistId, 
                    pieceId : occurrenceData.pieceId, 
                    startDateTime : occurrenceData.startDateTime,
                    filterId : occurrenceData.filterId,
                    id : occurrenceData.id
                }, 
                function(err, result) {
                    callback(err, result);
                }
    );
    
    db.end();
}


/**
 * insert new occurrence
 * @returns {Ocurrence} last inserted
 */
occurrenceDao.insert = function(occurrenceData, callback)
{

    db.query(
                "INSERT INTO Occurrence (playlistId, pieceId, startDateTime, filterId) "+
                "VALUES (:playlistId,:pieceId,:startDateTime,:filterId) ",
              
                {
                    playlistId : occurrenceData.playlistId, 
                    pieceId : occurrenceData.pieceId, 
                    startDateTime : occurrenceData.startDateTime,
                    filterId : occurrenceData.filterId
                }              
                , 
                function(err,result) {                                                   
                    occurrenceData.id = result.info.insertId
                    callback(err,occurrenceData);
                }
   );
    
    db.end();
}


/**
 * delete a occurrence
 */
occurrenceDao.delete = function(id,callback)
{
	db.query("DELETE FROM Occurrence WHERE id = :id",
                {
                   id : id
                }, 
                function(err, result) {
                    callback(err, result);
                }
    );
    
    db.end();
}


module.exports = occurrenceDao;