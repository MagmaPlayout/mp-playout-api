var express = require ("express");
var app = new express();
var http = require("http").Server(app);
var wsapi= require("./controllers/ws/ws.api");
var config = require("./config.js");



var Log = require ("log"),
	log = new Log("debug");

/*
* init ws api
 */
wsapi(http,log);


var port = process.env.PORT || config.port;


http.listen(port,function(){
	console.log("---------------------------------------------------------");
	console.log("-------------- Magma-Playout | Playout-API --------------");
	console.log("---------------------------------------------------------");
	log.info("server listening on %s",port)

});