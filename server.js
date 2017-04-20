var srvRest = require('./servers/rest/srvRest');
var srvWs = require('./servers/ws/srvWs');
var config = require("./config.js");


console.log("---------------------------------------------------------");
console.log("-------------- Magma-Playout | Playout-API --------------");
console.log("---------------------------------------------------------");

/**
 * setup REST Server
 */
srvRest.start();

/**
 * Setup Socket.io Server
 */
srvWs.start();







