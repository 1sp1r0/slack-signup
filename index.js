var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jQuery');

var app = express();

app.get('/', function (req, res) {
    res.status(200).send('Hello World!')
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
