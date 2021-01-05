const express = require("express");
const app = express();
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

  socket.broadcast.emit('connected', "Un utilisateur s'est connecté");

  socket.on('addMessage', msg => {
    io.emit("newMessage", formatMessage("Name", msg));
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', "Un utilisateur s'est déconnecté");
  })
});

server.listen(8080, function() {
  console.log("Server listening on port 8080");
});
