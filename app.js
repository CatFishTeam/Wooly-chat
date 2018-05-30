var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/level/*', function(req, res){
    nsp = io.of(req.originalUrl);
    nsp.on('connection', function(socket){
        if (!socket.sentMydata) {
            socket.broadcast.emit('connection', 'user x connected !');//Envoi a tous que l'utilisateur s'est connecté
            socket.on('sendMessage', function(msg){
                nsp.emit('message', msg);
            });
            socket.on('disconnect', function(){
                nsp.emit('message', "user disconnected");
            });
            socket.sentMydata = true;
        }
    });
    res.sendFile(__dirname + '/index.html');
})

http.listen(2000, function(){
    console.log('listening on *:2000');
});
