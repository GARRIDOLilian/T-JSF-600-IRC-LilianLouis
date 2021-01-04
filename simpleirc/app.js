const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Tutorial',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB Connected Successfully");
});

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

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
  else
  {
    fs.readFile(filePath, "utf-8", function(error, content) {
      //res.writeHead(200);
      res.end(content);
    });
  }
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("Un utilisateur s'est connecté");
  socket.on('addMessage', function(data) {
    console.log(data);
    io.emit("newMessage", data);
  })
});

server.listen(8080, function() {
  console.log("Server listening on port 8080");
});
