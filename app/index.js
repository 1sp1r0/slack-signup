var http       = require('https');
var express    = require('express');
var bodyParser = require('body-parser');
var myApi 		 = require('./api');
var app        = express();
var path       = require('path');
// -----------------------------
// Routing

app.use(function() {
    app.use(express.static('static'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
});

// routing for parsing typeform
app.get('/tf', myApi.parse_typeform);

// Landing url
app.get('/', function (req, res) {
  console.log("__dirname");
  res.sendFile(__dirname + '../static/index.html');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

// listen
app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});
