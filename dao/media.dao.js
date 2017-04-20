//var db = require('../db/mpadmin.db');

var mediaDao = {}


/**
 * find media by id
 */
mediaDao.getById = function(id,callback)
{
	callback(null,[{id:"1", name:"clip1"}]);
}


/**
 * find media by id
 */
mediaDao.listAll = function(callback)
{

	callback(null,[{id:"1", name:"clip1"}, {id:"2", name:"clip2"}]);
}


/**
 * insert new media
 */
mediaDao.update= function(mediaData)
{
	return null;
}


/**
 * insert new media
 */
mediaDao.insert = function(mediaData)
{
	return null;
}


/**
 * delete a media
 */
mediaDao.delete = function(id)
{
	return null;
}

module.exports = mediaDao;