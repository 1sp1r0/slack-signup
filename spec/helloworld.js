var request = require("request");
var base_url = "https://tf-slack-signup.herokuapp.com/"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("return status 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});
