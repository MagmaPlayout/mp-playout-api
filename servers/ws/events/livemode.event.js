var pieceDao = require('../../../dao/piece.dao');
var sketchDao = require('../../../dao/sketch.dao');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
module.exports = function (socket,log) {

  socket.on('playoutLiveMode', function (data) {
   
    log.info("trigger playoutLiveMode event");
    
    pieceDao.listAll(function(err, result){

      if(err)
        throw err;

      socket.broadcast.emit("pieceList", result);

    });

    sketchDao.listAll(function(err, result){

      if(err)
        throw err;

      socket.broadcast.emit("sketchList", result);

    })

  });


}
