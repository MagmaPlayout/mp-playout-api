var express = require ("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Log = require ("log"),
	log = new Log("debug");
var liveMode = require('./events/livemode.event');
var config = require("../../config.js");


 io.on('connection',function(socket){
    
        liveMode(socket, log);

    });


var port = process.env.PORT || config.ws.port;

function start (){

	http.listen(port,function(){
		console.log("_______________________________________________________________");
		console.log("-> WS server listening on port %s",port);
		console.log("_______________________________________________________________");

	});
}


exports.start = start; 