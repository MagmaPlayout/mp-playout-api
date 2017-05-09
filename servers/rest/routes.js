function setup(app, controllers) {   
	app.get('/api/medias/:id', controllers.media.getById);
    app.get('/api/medias', controllers.media.listAll);
	app.put('/api/medias/:id', controllers.media.update);
    app.post('/api/medias', controllers.media.insert);
	app.delete('/api/medias/:id', controllers.media.delete);
	app.get('/api/medias/name/:name', controllers.media.getByName);
	app.get('/api/medias/path/:pathlist', controllers.media.getByPathList);
}

exports.setup = setup;