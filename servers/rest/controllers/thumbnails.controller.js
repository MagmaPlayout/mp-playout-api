var thumbnailsDao = require ('../../../dao/thumbnails.dao.js');
var config = require('../../../config');

var thumbnailsController = {};

/**
 * GET - Return all thumbnailss
 */
thumbnailsController.listAll = function(req, res) { 
    
    thumbnailsDao.listAll(function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * POST - Create a new thumbnails
 */
thumbnailsController.insert = function(req, res) { 
   
	var thumbnails = {
        mediaId: req.body.mediaId,
        thumbnails: req.body.thumbnails,
	};

    thumbnailsDao.insert(thumbnails, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};


module.exports = thumbnailsController;