var http = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jQuery');

var app = express();

// time variables
var curr_time = "1457404271"; //example epoche time
var last_invites_sent = "1457404271";

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
var slack_url = slack_teamname + slack_api_1;

// slack API token (get yours at https://api.slack.com/docs/oauth-test-tokens)
var slack_invite_token = "xoxp-22114508481-22108923172-23857668930-177a0526cd";

// slack user info
function user(first, email) {
  this.first_name = first;
  this.email = email;
}

// array to hold all the new invites (will be cleared)
var new_invites = [];

exports.parse_typeform = function(req, res) {
  http.request(typeform_url, (res) => {
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
  res.send("Parsed Typeform!");
};

// send invites to users in new_invites array
exports.send_invites = function(req, res) {
  for (signup of new_invites) {
    curr_time = (new Date).getTime().toString(); // current time in epoche
    $.ajax({
      url: slack_url + curr_time,
      data: {
        email: signup.email,
        channels: "C0N39LW3V", //YOUR CHANNEL
        first_name: signup.first_name,
        token: slack_invite_token,
        _attempts: 1
      },
      error: console.log("Ajax failed :("),
      success: console.log("Successful Ajax :)")
    })
  };
  last_invites_sent = curr_time;
  res.send("Invites send!");
};

// routing for parsing typeform
app.get('/tf', exports.parse_typeform);

//routing for submitting invites
app.post('/invite', exports.send_invites);


app.get('/', function (req, res) {
    res.status(200).send('Slack-Signup is live!')
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
