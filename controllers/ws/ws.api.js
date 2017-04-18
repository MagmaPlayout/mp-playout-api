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

            socket.broadcast.emit("mediaListAllData", mediaLst);

        });

    });

}