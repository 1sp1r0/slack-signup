var request = require("request");
var base_url = "http://localhost:3000/"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("return status 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        console.log(body);
        expect(body).toBe("Hello World!");
        setTimeout(function () {
            console.log('inside timeout');
            done();
        }, 500);
      });
    });
  });
});
