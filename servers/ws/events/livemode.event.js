var mediaDao = require('../../../dao/media.dao');
var sketchDao = require('../../../dao/sketch.dao');

/* register-handler.js */
module.exports = function (socket) {
  // registration related behaviour goes here...
  socket.on('playoutLiveMode', function (data) {
    console.log('liveModeInit request');

    mediaDao.listAll(function(err, result){

      if(err)
        throw err;

      socket.broadcast.emit("mediaList", result);

    });

    sketchDao.listAll(function(err, result){

      if(err)
        throw err;

      socket.broadcast.emit("sketchList", result);

    })

  });


}
