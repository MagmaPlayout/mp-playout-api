var pieceDao = require ('../../../dao/piece.dao.js');
var config = require('../../../config');

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
    
    res.send(500, "Not implemented");
    
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
        filterId : req.body.filterId,
        frameCount : req.body.frameCount,
        frameRate : req.body.frameRate     
	};

    pieceDao.insert(piece, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * DEL - Delete a piece with specified ID
 */
pieceController.delete = function(req, res) { 
    var pieceId = req.params.id;

    pieceDao.getById(pieceId,function(err, piece){
        console.log(piece);
        if(piece!=null){
            if(piece.filterId != null){
                pieceDao.delete(pieceId, function (err) {

                    if (err)
                        return res.status(500).send(err.message);

                    res.status(200).jsonp(true);

                });
            }
            else{
                console.log("The FilterId is null");
                return res.status(500).send(piece.name + " media could not be deleted");
            }
        }
        else{
            console.log("The piece not exist")
            return res.status(500).send("The piece not exist");
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
 * GET - find pieces by path list
 */
pieceController.getByPathList= function(req, res){

    var pathList = JSON.parse(req.params.pathlist);
  
    pieceDao.getByPathList(pathList, function(err, result) {
       
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