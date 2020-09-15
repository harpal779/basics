

var express = require('express');
const app = express();

app.get('/',function(req,res){

 res.write("<h1>Index Page.</h1>");

});

app.get('/p1',function(req,res){

  res.write("<h1>Page1.</h1>");

});


var server = app.listen(3000,function(){
  var port =server.address().port;
  console.log("server running at  http://localhost:%s",port);

});