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
   
	res.send(500, "Not implemented");
};


/**
 * DEL - Delete a piece with specified ID
 */
pieceController.delete = function(req, res) { 

   res.send(500, "Not implemented");
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

module.exports = pieceController;