//var db = require('../db/mpadmin.db');

var mediaDao = {}


/**
 * find media by id
 */
mediaDao.getById = function(id,callback)
{
	callback(null,
		{
			id:"1", 
			name:"clip1",
			duration: "",
			frameRate : 0,
			path: "/",
			frameCount : 2000,
			description : "clip1 description",
			resolution : "4:3"
		}
		);
}



/**
 * find media by id
 */
mediaDao.listAll = function(callback)
{

	callback(null,[
		{
			id:"1", 
			name:"clip1",
			duration: "",
			frameRate : 0,
			path: "/",
			frameCount : 2000,
			description : "clip1 description",
			resolution : "4:3"
		},
		{
			id:"2", 
			name:"clip2",
			duration: "",
			frameRate : 0,
			path: "/",
			frameCount : 2000,
			description : "clip2 description",
			resolution : "4:3"
		}
		]);
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