//
// Clone server Model One
//
var zmq = require('zmq')
    , publisher = zmq.socket('pub');

publisher.bindSync("tcp://*:5556");


var kvmap = {};
var sequence = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function() {
    // Get values that will fool the boss
    var msg = {
        seq: ++sequence,
        key: rand(1, 10000),
        body: rand(1, 1000000)
    };
    console.log('Sending ' + msg.key);
    publisher.send(JSON.stringify(msg));
    kvmap[msg.key] = msg;

}, 100);

