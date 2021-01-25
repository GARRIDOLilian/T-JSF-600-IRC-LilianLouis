var express = require("express");
var session = require('express-session');
var app = express();
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
const mongoose = require('mongoose');
const formatMessage = require('./utils/messages');

mongoose.connect('mongodb://localhost:27017/simpleirc',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB Connected Successfully");
});

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  var filePath = path.join(__dirname,page);

  if(page === "/")
  {
    fs.readFile("public/index.html", "utf-8", function(error, content) {
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(content);
    });
  }
  else if(page === "/index.html")
  {
    fs.readFile("public/main.html", "utf-8", function(error, content) {
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(content);
    });
  }
  else
  {
    fs.readFile(filePath, "utf-8", function(error, content) {
      //res.writeHead(200, {"Content-Type":"text/html"});
      res.end(content);
    });
  }
});

var io = require('socket.io')(server);

io.on('connection', socket => {

  //Session
  socket.on('session', nick => {
    app.use(session({
      secret: "test",
      resave: true,
      saveUninitialized: true
    }));
    console.log("1");
    app.use('/',function(req,res){
        console.log("2");
        console.log(req.session);
    });
  })

  socket.broadcast.emit('connected', "Un utilisateur s'est connecté");

  socket.on('addMessage', msg => {
    io.emit("newMessage", formatMessage("Name", msg));
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', "Un utilisateur s'est déconnecté");
  });
});

server.listen(8080, function() {
  console.log("Server listening on port 8080");
});
