var occurrenceDao = require ('../../../dao/occurrence.dao.js');
var config = require('../../../config');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var occurrenceController = {};


/**
 * GET - Return a occurrence with specified ID
 * @return {Occurrence}
 */
occurrenceController.getById = function(req, res) { 
  
    occurrenceDao.getById(req.params.id, function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * GET - Return all occurrences
 * @returns {List<Occurrence>}
 */
occurrenceController.listAll = function(req, res) { 
    
    occurrenceDao.listAll(function(err, result) {

        if(err) 
            return res.send(500, err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * PUT - Update a occurrence
 * @returns {bool}
 */
occurrenceController.update = function(req, res) { 
    
    var occurrence = {
        id: req.body.id,
		playlistId: req.body.playlistId,
		pieceId: req.body.pieceId,
        startDateTime: req.body.startDateTime,
		filterId: req.body.filerId,     
	};

    occurrenceDao.update(occurrence, function(err,result) {
        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(true);

    });
    
};


/**
 * POST - Create a new occurrence
 * @returns {Occurrence} last inserted
 */
occurrenceController.insert = function(req, res) { 
    
	var ocurrence = {
		playlistId: req.body.playlistId,
		pieceId: req.body.pieceId,
        startDateTime: req.body.startDateTime,
		filterId: req.body.filerId,     
	};

    occurrenceDao.insert(ocurrence, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};


/**
 * DEL - Delete a occurrence with specified ID
 * @returns {bool}
 */
occurrenceController.delete = function (req, res) {

    occurrenceDao.delete(req.body.id, function (err) {

        if (err)
            return res.status(500).send(err.message);

        res.status(200).jsonp(true);

    });
};

occurrenceController.deleteById = function (req, res) {
    
        occurrenceDao.delete(req.params.id, function (err) {
    
            if (err)
                return res.status(500).send(err.message+"gato pardo");
    
            res.status(200).jsonp(true);
    
        });
    };

module.exports = occurrenceController;