var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jQuery');

var app = express();

// Typefrom urls
var typeform_api_1 = "https://api.typeform.com/v0/form/"
var typeform_form_key = "gUl2lY"; // YOUR FORM KEY
var typeform_key = "?key=c715b7dacbe3548df13672b5066f9d2b1080201b"; // YOUR API KEY
var typeform_api_2 = "&completed=true&offset=0";
var typeform_url = typeform_api_1 + typeform_form_key +
                   typeform_key + typeform_api_2;

// Slack API url
var slack_teamname = "https://ssushi-clarifaiapi.slack.com" // YOUR TEAM URL
var slack_api_1 = "/api/users.admin.invite?t="
var curr_time = (new Date).getTime().toString(); // current time in epoche
var slack_url = slack_teamname + slack_api_1 + curr_time;

// slack user info
function user(first, email) {
  this.first_name = first;
  this.email = email;
}

// array to hold all the new invites (will be cleared)
var new_invites = [];

var parse_typeform = http.request(typeform_url, funtion(res) {
  var tf_json_stringify = JSON.stringify(res);
  var tf_json = JSON.parse(tf_api_json_stringify);
  var tf_res = tf_json.responses;
  var res_length = Object.keys(tf_res).length;
  for (var i=0; i < res_length; i++) {
    var new_user = new user();
    new_user.first_name = tf_res[i].answers["textfield_18214586"];
    new_user.email = tf_res[i].answers["email_18214588"];
    new_invites.push();
    console.log(new_user.first_name); // test
  }
});

// Start The routing for submitting typeform info to slack

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
