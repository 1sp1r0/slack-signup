var http       = require('https');
var express    = require('express');
var bodyParser = require('body-parser');
var myApi 		 = require('./api');
var app = express();

// -----------------------------
// Routing

// routing for parsing typeform
app.get('/tf', myApi.parse_typeform);

// Landing url
app.get('/', function (req, res) {
    res.status(200).send('Slack-Signup is live!')
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

// listen
app.listen(process.env.PORT || 5000, function () {
  console.log('App listening on port 5000!');
});
