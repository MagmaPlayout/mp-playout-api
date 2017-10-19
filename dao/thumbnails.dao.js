var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var thumbnailsDao = {}

/**
 *  get all thumbnailss
 */
thumbnailsDao.listAll = function(callback)
{
    
    mapthumbnailsObject(null, callback);

}



/**
 * insert new thumbnails
 */
thumbnailsDao.insert = function(thumbnailsData, callback)
{
    //thumbnailsData.thumbnails = []
 
    var strQuery = "INSERT INTO Thumbnail (mediaId, path) VALUES ";                                                                                                                    
    thumbnailsData.thumbnails.forEach(thumb => {
        strQuery = strQuery + "('"+thumbnailsData.mediaId+"', '"+thumb.path+"'),"
    });

  
    strQuery = strQuery.split(''); 
    strQuery.splice(strQuery.lastIndexOf(','),1,';');  //hack para la ultima coma convertirla en punto y coma
    strQuery = strQuery.join(''); 

    console.log("query: "+strQuery);

    db.query(strQuery, function(err,result) {
        if(!err){   
            thumbnailsData.id = result.info.insertId      
        }
        else{
            thumbnailsData = null;
        }
        callback(err,thumbnailsData);
    });

    db.end();
	//return null;
}

module.exports = thumbnailsDao;