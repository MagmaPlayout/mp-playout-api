/*
 * ███╗   ███╗██████╗       ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
 * ████╗ ████║██╔══██╗      ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
 * ██╔████╔██║██████╔╝█████╗██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗  
 * ██║╚██╔╝██║██╔═══╝ ╚════╝██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  
 * ██║ ╚═╝ ██║██║           ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
 * ╚═╝     ╚═╝╚═╝           ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
 */

var fs = require("fs");
var file = "./db/db_playout.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose(),
db_playout = new sqlite3.Database(file);

db_playout.serialize(function() {
  if(!exists) {
  	console.log("Creating tables at db_playout");
    db_playout.run("PRAGMA foreign_keys = off");
	db_playout.run("BEGIN TRANSACTION");
	db_playout.run("DROP TABLE IF EXISTS CompositeSketch");
	db_playout.run("CREATE TABLE CompositeSketch (id INTEGER PRIMARY KEY AUTOINCREMENT, idComposite INTEGER REFERENCES CompositeSketch (id) ON DELETE NO ACTION ON UPDATE NO ACTION, idLeaf REFERENCES Sketch (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS Media");
	db_playout.run("CREATE TABLE Media (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, name TEXT NOT NULL UNIQUE, duration TEXT, frameRate INTEGER, description TEXT, path TEXT NOT NULL, frameCount INTEGER, resolution TEXT, toBeDeleted BOOLEAN)");
	db_playout.run("DROP TABLE IF EXISTS MediaInfo");
	db_playout.run("CREATE TABLE MediaInfo (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, mediaId INTEGER REFERENCES Media (id) ON DELETE NO ACTION ON UPDATE NO ACTION, \"key\" TEXT, value TEXT)");
	db_playout.run("DROP TABLE IF EXISTS Piece");
	db_playout.run("CREATE TABLE Piece (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, mediaID INTEGER REFERENCES Media (id) ON DELETE NO ACTION ON UPDATE NO ACTION, sketchId INTEGER REFERENCES Sketch (id) ON DELETE NO ACTION ON UPDATE NO ACTION, resolution TEXT, duration TEXT)");
	db_playout.run("DROP TABLE IF EXISTS Playlist");
	db_playout.run("CREATE TABLE Playlist (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, name TEXT NOT NULL, duration TEXT, description TEXT)");
	db_playout.run("DROP TABLE IF EXISTS PlaylistPieces");
	db_playout.run("CREATE TABLE PlaylistPieces (id INTEGER PRIMARY KEY AUTOINCREMENT, \"index\" INTEGER NOT NULL, playlistId INTEGER REFERENCES Playlist (id) ON DELETE NO ACTION ON UPDATE NO ACTION, pieceId INTEGER REFERENCES Piece (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS Sketch");
	db_playout.run("CREATE TABLE Sketch (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, htmlContent TEXT, name TEXT NOT NULL, description TEXT)");
	db_playout.run("DROP TABLE IF EXISTS Tag");
	db_playout.run("CREATE TABLE Tag (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, tag TEXT)");
	db_playout.run("DROP TABLE IF EXISTS TagMedias");
	db_playout.run("CREATE TABLE TagMedias (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, tag TEXT UNIQUE NOT NULL, mediaId INTEGER REFERENCES Media (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS TagPieces");
	db_playout.run("CREATE TABLE TagPieces (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, tag TEXT UNIQUE NOT NULL, pieceId INTEGER REFERENCES Piece (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS TagPlaylists");
	db_playout.run("CREATE TABLE TagPlaylists (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, tag TEXT UNIQUE NOT NULL, playlistId REFERENCES Playlist (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS TagSketches");
	db_playout.run("CREATE TABLE TagSketches (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT UNIQUE NOT NULL, sketchId INTEGER REFERENCES Sketch (id) ON DELETE NO ACTION ON UPDATE NO ACTION)");
	db_playout.run("DROP TABLE IF EXISTS Thumbnail");
	db_playout.run("CREATE TABLE Thumbnail (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, mediaId INTEGER REFERENCES Media (id) ON DELETE NO ACTION ON UPDATE NO ACTION, path TEXT NOT NULL)");
	db_playout.run("COMMIT TRANSACTION");
	db_playout.run("PRAGMA foreign_keys = on");
  }
});

module.exports = db_playout;