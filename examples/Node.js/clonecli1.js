//
// Clone client Model One
//
var zmq = require('zmq')
    , publisher = zmq.socket('pub');

var subscriber = zmq.socket('sub');
var sequence = 0;
var kvmap = {};

subscriber.subscribe('');

subscriber.on('message', function(data){
    var msg = JSON.parse(data);
    console.log('Received ' + msg.key);
    kvmap[msg.key] = msg;
    sequence++;
});

subscriber.connect("tcp://localhost:5556");
