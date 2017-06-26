var mediaDao = require ('../../../dao/media.dao.js');
var config = require('../../../config');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var mediaController = {};


/**
 * GET - Return a media with specified ID
 */
mediaController.getById = function(req, res) { 
    
    mediaDao.getById(req.params.id, function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * GET - Return all medias
 */
mediaController.listAll = function(req, res) { 
    
    mediaDao.listAll(function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * PUT - Update a media
 */
mediaController.update = function(req, res) { 
    

    var media = {
		name: req.body.name,
		desription: req.body.description,
		duration: req.body.duration,
        frameRate: req.body.fps,
        frameCount: req.body.frames,
        resolution: req.body.resolution,
        path: req.body.path

	};

    mediaDao.update(media, function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * POST - Create a new media
 */
mediaController.insert = function(req, res) { 
   
	var media = {
		name: req.body.name,
		description: req.body.description,
		duration: req.body.duration,
        frameRate: req.body.frameRate,
        frameCount: req.body.frameCount,
        resolution: req.body.resolution,
        path: req.body.path,
        thumbnails: req.body.thumbnails
	};

    mediaDao.insert(media, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * DEL - Delete a media with specified ID
 */
mediaController.delete = function(req, res) { 

    mediaDao.delete(req.params.id, function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};

/**
 * GET - find medias by name
 */
mediaController.getByName= function(req, res){

    mediaDao.getByName(req.params.name, function(err, result) {

        if(err) 
            return res.send(500, err.message);
    
        res.status(200).jsonp(result);

    });
}

/**
 * GET - find medias by path list
 */
mediaController.getByPathList= function(req, res){

    var pathList = JSON.parse(req.params.pathlist);
  
    mediaDao.getByPathList(pathList, function(err, result) {
    
        if(err) 
            return res.send(500, err.message);
    
        res.status(200).jsonp(result);

    });
     
}

module.exports = mediaController;