"use strict";

const path = require('path');
const ServerEngine = require('incheon').ServerEngine;

class SpaaaceServerEngine extends ServerEngine{

    constructor(io, gameEngine, inputOptions){
        super(io, gameEngine, inputOptions);
        this.serializer.registerClass(require('../common/Player'));
    };

    start(){
        super.start();
    };

    onPlayerConnected(socket){
        super.onPlayerConnected(socket);
    };

    onPlayerDisconnected(socketId, playerId){
        super.onPlayerDisconnected(socketId, playerId);

        delete this.gameEngine.world.objects[playerId];
    };
}

module.exports = SpaaaceServerEngine;
