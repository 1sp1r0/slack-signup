var http       = require('https');
var express    = require('express');
var bodyParser = require('body-parser');
var myApi 		 = require('./api');
var app        = express();
var path       = require('path');

// -----------------------------
// Routing

app.use(function() {
    app.use(express.static(path.join(__dirname, 'static')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
});

// routing for parsing typeform
app.get('/tf', myApi.parse_typeform);

// Landing url
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

// listen
app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 000!');
});
