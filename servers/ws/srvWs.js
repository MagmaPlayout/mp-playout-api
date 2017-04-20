var express = require ("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Log = require ("log"),
	log = new Log("debug");
var liveMode = require('./events/livemode.event');
var config = require("../../config.js");


 io.on('connection',function(socket){
    
        log.info("Client %s connected", socket.client.id);
        
        liveMode(socket);

    });


var port = process.env.PORT || config.ws.port;

function start (){

	http.listen(port,function(){
		console.log("***************************************************************");
		console.log("WS server listening on port %s",port);
		console.log("***************************************************************");

	});
}


exports.start = start; 