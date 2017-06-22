var pieceDao = require('../../../dao/piece.dao');
var sketchDao = require('../../../dao/sketch.dao');

/* register-handler.js */
module.exports = function (socket) {
  // registration related behaviour goes here...
  socket.on('playoutLiveMode', function (data) {
    console.log('liveModeInit request');

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
