/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
function setup(app, controllers) {
	//medias api   
	app.get('/api/medias/:id', controllers.media.getById);
    app.get('/api/medias', controllers.media.listAll);
	app.put('/api/medias/:id', controllers.media.update);
    app.post('/api/medias', controllers.media.insert);
	app.delete('/api/medias/:id', controllers.media.delete);
	app.get('/api/medias/name/:name', controllers.media.getByName);
	app.get('/api/medias/path/:pathlist', controllers.media.getByPathList);
	app.get('/api/medias/ids/:ids', controllers.media.getByMediaIdList);

	//thumbnails api
	app.post('/api/thumbnails', controllers.thumbnails.insert);
	
	//pieces api
	app.get('/api/pieces/:id', controllers.piece.getById);
    app.get('/api/pieces', controllers.piece.listAll);
    app.get('/api/pieceswofilter', controllers.piece.getAllWithOutFilter);
	app.put('/api/pieces/:id', controllers.piece.update);
    app.post('/api/pieces', controllers.piece.insert);
	app.delete('/api/pieces/:id', controllers.piece.delete);
	app.get('/api/pieces/name/:name', controllers.piece.getByName);

	//occurrence api
	app.get('/api/occurrences/:id', controllers.occurrence.getById);
    app.get('/api/occurrences', controllers.occurrence.listAll);
	app.put('/api/occurrences', controllers.occurrence.update);
    app.post('/api/occurrences', controllers.occurrence.insert);
	app.delete('/api/occurrences', controllers.occurrence.delete);

    // filters API
	app.get('/api/filters', controllers.filter.listAll);
	
	// FilterArgs API
	app.get('/api/filterArgs', controllers.filterArgs.listAll);
	app.get('/api/filterArgs/:id', controllers.filterArgs.getById);

    //tag api
	app.get('/api/tags', controllers.tag.listAll);
    app.post('/api/tags', controllers.tag.insert);
	
}

exports.setup = setup;
