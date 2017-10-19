var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mediaController = require("./controllers/media.controller");
var thumbnailsController = require("./controllers/thumbnails.controller");
var pieceController = require("./controllers/piece.controller");
var occurrenceController = require("./controllers/occurrence.controller");
var filterArgsController = require("./controllers/filterArgs.controller");
var config = require("../../config.js");
var routes = require('./routes');
var fs = require('fs');

var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

// =================================================================
// configuration ===================================================
// =================================================================

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// Enable CORS
app.all('/*', function(req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});




var controllers = {
  media : mediaController,
  piece : pieceController,
  thumbnails : thumbnailsController,
  occurrence : occurrenceController,
  filterArgs : filterArgsController
  /** 
   * ...
   * Aca van todos los controlers 
   * */
};

function start() {
  routes.setup(app, controllers);
  var port = process.env.PORT || config.rest.port;
  app.listen(port);
  console.log("_______________________________________________________________");
  console.log("-> Express server listening on port %d in %s mode", port, app.settings.env);
  console.log("_______________________________________________________________");
}
// *******************************************************
exports.start = start;
//exports.app = app;





