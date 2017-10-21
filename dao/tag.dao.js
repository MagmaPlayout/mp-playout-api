var db = require('../db/playout.db');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var tagDao = {}

/**
 * find tag by id
 */
tagDao.listAll = function(callback)
{
	 db.query("SELECT * FROM Tags",
            function(err, rows) {
                callback(err, rows);
    });

    db.end();
}

/**
 * insert new tag
 *  @returns {Tag} last inserted
 */
tagDao.insert = function(tagData,callback)
{
    db.query(
            "INSERT INTO Tags (tag) "+
            "VALUES (:tag) ",
            tagData,
            function(err,result) {  
                if(!err){
                    tagData.id = result.info.insertId
                }                                                 
                else{
                    tagData = null;
                }
                callback(err, tagData);
            }
    );
    
    db.end();
}

module.exports = tagDao;