var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author rombus
 */
var filterArgsDao = {};

/**
 * Get filterArgs by filterId
 */
filterArgsDao.getById = function(id,callback) {
	db.query(
		" SELECT * " +
		" FROM FilterArgs " +
        " WHERE filterId = ? " +
        " ORDER BY id asc ",
		[id],
		function(err, rows) {
			var filterArgsMap = null;
			if(rows != null){
				filterArgsMap = rows.map( function(item) {
					return {
						id: item.id,
						filterId: item.filterId,
						key: item.key,
						value: item.value
					}
				});
			}
			callback(err, filterArgsMap);
		}
    );

    db.end();
}

/**
 *  Get all filterArgs
 */
filterArgsDao.listAll = function(callback) {
   db.query(
        " SELECT * " +
        " FROM FilterArgs ",
        function(err, rows) {
            var filterArgsMap = null;
            if(rows != null){
                filterArgsMap = rows.map(function(item) {
                    return {
                        id: item.id,
                        filterId: item.filterId,
                        key: item.key,
                        value: item.value
                    }
                });
            }
            callback(err, filterArgsMap);
        }
    );

    db.end();
}

/**
 * Update a filterArg
 */
filterArgsDao.update= function(filterArgsData,callback) {
    db.query(
        " UPDATE FilterArgs "+
        " SET key = :key, "+
        " value = :value " +
        " WHERE id = :id",
        {
            key : filterArgsData.key,
            value : filterArgsData.value,
            id : parseInt(filterArgsData.id)
        },
        function(err, result) {
            console.log(result);
            callback(err, result);
        }
    );

    db.end();
}

/**
 * Insert new FilterArgs
 * @returns {FilterArgs} last inserted
 */
filterArgsDao.insert = function(filterArgsData, callback) {
    db.query(
        " INSERT INTO FilterArgs (filterId, key, value) "+
        " VALUES (:filterId, :key, :value) ",
        {
            filterId : filterArgsData.filterId,
            key : filterArgsData.key,
            value : filterArgsData.value
        },
        function(err,result) {
            filterArgsData = null;
            if(!err){
                filterArgsData.id = result.info.insertId;
            }

            callback(err,filterArgsData);
        }
    );

    db.end();
}

module.exports = filterArgsDao;