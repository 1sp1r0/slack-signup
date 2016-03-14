var http       = require('https');
var express    = require('express');
var bodyParser = require('body-parser');
var $          = require('jQuery');
var request    = require('request');
var app = express();

// -----------------------------
// Routing

// routing for parsing typeform
app.get('/tf', parse_typeform);

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
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

// --------------------------------
// API url variables

// Time variables
// Invites will be send every 30 minutes + 1 min considering possible Heroku glitch
var curr_time    = new Date();
var offset       = new Date().getTimezoneOffset();
var gmt_time     = curr_time.setMinutes(new Date().getMinutes() - offset);
var gmt_time_obj = new Date(gmt_time);
var last_invites_sent = gmt_time_obj.setMinutes(new Date().getMinutes() - 31);

// Typefrom urls
var tf_link      = "https://api.typeform.com/v0/form/"
var tf_form_key  = "gUl2lY"; // YOUR FORM KEY
var tf_api_key   = "?key=c715b7dacbe3548df13672b5066f9d2b1080201b"; // YOUR API KEY
var tf_options   = "&completed=true&offset=0";
var tf_since     = "&since=" + last_invites_sent.toString().substring(0,10);
var typeform_url = tf_link     + tf_form_key + tf_api_key +
                   tf_options  + tf_since;

// Slack API url
var slack_teamname = "https://ssushi-clarifaiapi.slack.com" // YOUR TEAM URL
var slack_api_1 = "/api/users.admin.invite?t="
var slack_url = slack_teamname + slack_api_1;

// slack API token (get yours at https://api.slack.com/docs/oauth-test-tokens)
var slack_invite_token = "xoxp-22114508481-22108923172-23857668930-177a0526cd";

// array to hold all the new invites (will be cleared)
var new_invites = [];

// -------------------------------------
// Function definitions

// For storing slack user info
function user(first, email) {
  this.first_name = first;
  this.email = email;
}

// Call GET to Typeform API
// & Retrieve signups from the last 30 mins
function parse_typeform(req, res) {
  request(typeform_url, function(err, res, body) {
    var tf_json_text = JSON.stringify(body);
    var tf_json      = JSON.parse(tf_json_text);
    var tf_obj       = JSON.parse(tf_json);
    var tf_res       = tf_obj.responses;
    var res_length   = Object.keys(tf_res).length;
    for (var i=0; i < res_length; i++) {
      var new_user = new user();
      new_user.first_name = tf_res[i].answers["textfield_18214586"];
      new_user.email = tf_res[i].answers["email_18214588"];
      new_invites.push(new_user);
    };
    console.log(new_invites); // test
    send_invites();
  });
  res.send("Parsed Typeform!");
};

// Call POST to Typeform API
// Send invites to users in new_invites array
function send_invites() {
  console.log("Invites being send!");
  for (signup of new_invites) {
    curr_time = (new Date).getTime().toString(); // current time in epoche
    $.ajax({
      method: "POST",
      url: slack_url + curr_time,
      data: {
        email: signup.email,
        channels: "C0N39LW3V", //YOUR CHANNEL
        first_name: signup.first_name,
        token: slack_invite_token,
        _attempts: 1
      }
    })
    .done(function () { console.log("sucess") })
    .fail(function () { console.log("failed :(") })
  };
  last_invites_sent = curr_time;
};
