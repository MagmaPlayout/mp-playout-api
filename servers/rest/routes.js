function setup(app, controllers) {
	//medias api   
	app.get('/api/medias/:id', controllers.media.getById);
    app.get('/api/medias', controllers.media.listAll);
	app.put('/api/medias/:id', controllers.media.update);
    app.post('/api/medias', controllers.media.insert);
	app.delete('/api/medias/:id', controllers.media.delete);
	app.get('/api/medias/name/:name', controllers.media.getByName);
	app.get('/api/medias/path/:pathlist', controllers.media.getByPathList);
	
	//pieces api
	app.get('/api/pieces/:id', controllers.piece.getById);
    app.get('/api/pieces', controllers.piece.listAll);
	app.put('/api/pieces/:id', controllers.piece.update);
    app.post('/api/pieces', controllers.piece.insert);
	app.delete('/api/pieces/:id', controllers.piece.delete);
	app.get('/api/pieces/name/:name', controllers.piece.getByName);
	app.get('/api/pieces/path/:pathlist', controllers.piece.getByPathList);
}

exports.setup = setup;