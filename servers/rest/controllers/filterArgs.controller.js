var filterArgsDao = require ('../../../dao/filterArgs.dao.js');
var config = require('../../../config');

/**
 * @author rombus
 */
var filterArgsController = {};

/**
 * GET - Return a FilterArg with specified FilterId
 * @return {FilterArg}
 */
filterArgsController.getById = function(req, res) { 
    filterArgsDao.getById(req.params.id,
        function(err, result) {
            if(err) {
                return res.send(500, err.message);
            }

            res.status(200).jsonp(result);
        }
    );
};

/**
 * GET - Return all FilterArgs
 * @returns {List<FilterArgs>}
 */
filterArgsController.listAll = function(req, res) { 
    filterArgsDao.listAll(function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
};

/**
 * PUT - Update a FilterArg
 * @returns {bool}
 */
filterArgsController.update = function(req, res) { 
    var filterArg = {
        id: req.body.id,
        filterId: req.body.filerId,     
		key: req.body.key
	};

    filterArgsDao.update(occurrence, function(err,result) {
        if(err) {
            return res.status(500).send(err.message);
        }
     
        res.status(200).jsonp(true);
    });
};


/**
 * POST - Create a new FilterArg
 * @returns {FilterArgs} last inserted
 */
filterArgsController.insert = function(req, res) { 
    var filterArg = {
        id: req.body.id,
        filterId: req.body.filerId,     
		key: req.body.key
	};

    filterArgsDao.insert(ocurrence, function(err, result) {
        if(err) {
            return res.status(500).send(err.message);
        }
     
        res.status(200).jsonp(result);
    });
};


/**
 * DEL - Delete a FilterArg with a specified FilterID
 * @returns {bool}
 */
filterArgsController.delete = function (req, res) {
    filterArgsDao.delete(req.body.id, function (err) {
        if(err) {
            return res.status(500).send(err.message);
        }

        res.status(200).jsonp(true);
    });
};

module.exports = filterArgsController;