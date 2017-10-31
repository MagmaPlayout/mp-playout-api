var pieceDao = require ('../../../dao/piece.dao.js');
var config = require('../../../config');
var Log = require ("log"),
	log = new Log("debug");

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var pieceController = {};


/**
 * GET - Return a piece with specified ID
 */
pieceController.getById = function(req, res) { 

    pieceDao.getById(req.params.id, function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * GET - Return all pieces
 */
pieceController.listAll = function(req, res) { 
    
    pieceDao.listAll(function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * PUT - Update a piece
 */
pieceController.update = function(req, res) { 
    
    //por ahora, estos son los atributos modificables.
	var piece = {
        id : req.body.id,
		name : req.body.name, 
        filterConfigList :JSON.parse(req.body.filterConfigList),
        tagList : JSON.parse(req.body.tagList)    
	};
   
    pieceDao.update(piece, function(err, result) {
        var mgeError = "The media could not be updated";
        
        if(err) {
            log.error(err.message);
            return res.status(500).send(mgeError);
        }        
        else if(result == null){//incomplete transaction
            
            log.error(mge);
            return res.status(500).send(mgeError);
        }
        else   
            res.status(200).jsonp(result);

    });
    
};


/**
 * POST - Create a new piece
 */
pieceController.insert = function(req, res) { 
  
	var piece = {
		name : req.body.name, 
        mediaId : req.body.mediaId, 
        resolution : req.body.resolution,
        duration : req.body.duration,
        path : req.body.path,
        frameCount : req.body.frameCount,
        frameRate : req.body.frameRate,
        filterConfigList : req.body.filterConfigList == null ? [] : JSON.parse(req.body.filterConfigList),
        tagList : req.body.tagList == null ? [] : JSON.parse(req.body.tagList)    
	};
   
    pieceDao.insert(piece, function(err, result) {
        var mgeError = "The media could not be created";
        
        if(err) {
            log.error(err.message);
            return res.status(500).send(mgeError);
        }        
        else if(result == null){//incomplete transaction
            
            log.error(mgeError);
            return res.status(500).send(mgeError);
        }
        else   
            res.status(200).jsonp(result);

    });
};


/**
 * DEL - Delete a piece with specified ID
 */
pieceController.delete = function(req, res) { 
    var pieceId = req.params.id;
  
    pieceDao.hasFilter(pieceId,function(err, resp){
        if(resp){
            
            pieceDao.delete(pieceId, function (err) {

                if (err)
                    return res.status(500).send(err.message);

                res.status(200).jsonp(true);

            });
            
        }
        else{
            console.log("The piece could not be deleted, has not filter.");
            return res.status(500).send("the media could not be deleted");
        }

    });   
     
};

/**
 * GET - find pieces by name
 */
pieceController.getByName= function(req, res){

    pieceDao.getByName(req.params.name, function(err, result) {
    
        if(err) 
            return res.send(500, err.message);
    
        res.status(200).jsonp(result);

    });
}

/**
 * GET - Returns a list of pieces that don't have a filter.
 */
pieceController.getAllWithOutFilter = function(req, res){
    pieceDao.getAllWithOutFilter(function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
}

module.exports = pieceController;