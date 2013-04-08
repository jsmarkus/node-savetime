var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var browserify = require('browserify-middleware');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.logger());
app.use('/js', browserify(__dirname + '/../client/index.js'));
app.use(express.static(__dirname + '/s'));
app.use(express.bodyParser());
app.use(express.cookieParser('kdgfoeugfqwoeu'));

app.get('/', function (req, res) {
    res.render('index');
});

var server = http.createServer(app);
var io = socketio.listen(server);


app.set('io', io);
module.exports = {http:server, app:app};
// server.listen(3000);