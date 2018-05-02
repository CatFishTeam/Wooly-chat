var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/level/*', function(req, res){
    var nsp = io.of(req.originalUrl);
    nsp.on('connection', function(socket){
        console.log('someone connected');
        nsp.emit('hi', 'everyone!');
    });
    res.sendFile(__dirname + '/index.html');
})


http.listen(3000, function(){
    console.log('listening on *:3000');
});
