/**
 * ws init
 */
module.exports = function(httpServer,log){
    var io = require("socket.io")(httpServer);
    log.info('ws api mockupeada');

    io.on('connection',function(socket){
    
        log.info("Client %s connected", socket.client.id);
        
        socket.on('playoutLiveMode', function() {
            log.info('playoutLiveMode request');

            var mediaLst = [
                        {id:"1", name:"clip1", duration:"2000"},
                        {id:"2", name:"clip2", duration:"2500"},
                        ];
            var sketchLst = [
                        {id:"1", name:"sketch1", htmlContent:"<h1 style='color: blue;'>Gato</h1>"},
                        {id:"2", name:"sketch2", htmlContent: "<h1 style='color: red;'>Atrevido</h1>"},
                        {id:"3", name:"sketch3", htmlContent: "<h2 style='background-color:black; color:yellow;'>Te cabió</h2>"}
                        ];
            

            socket.broadcast.emit("mediaList", mediaLst);
            socket.broadcast.emit("sketchList", sketchLst);

        });

    });

}

