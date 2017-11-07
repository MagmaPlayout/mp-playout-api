var filterDao = require ('../../../dao/filter.dao.js');
var config = require('../../../config');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var filterController = {};

/**
 * GET - Return all filters
 */
filterController.listAll = function(req, res) { 
    
    filterDao.listAll(function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};

module.exports = filterController;