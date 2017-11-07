var tagDao = require ('../../../dao/tag.dao.js');
var config = require('../../../config');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var tagController = {};

/**
 * GET - Return all tags
 */
tagController.listAll = function(req, res) { 
    
    tagDao.listAll(function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};

/**
 * POST - Create a new tag
 * @returns {Tag} last inserted
 */
tagController.insert = function(req, res) { 
   
	var tag = {
		tag : req.body.tag,   
	};

    tagDao.insert(tag, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};

module.exports = tagController;