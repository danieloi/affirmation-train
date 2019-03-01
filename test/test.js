const Nightmare = require("nightmare");
const assert = require("assert");

describe("Pull content from affirmation Train", function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout("60s");

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  describe("clicking through posts", () => {
    it("should retrieve post information sequentially", done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      const title = yield nightmare
        .goto("https://www.affirmation-train.org/category/affirmation")
        .click(".more-link")
        .wait(2000)
        .title()
        
        // .evaluate(() => document.querySelector(".entry").children)
        // .end()
        // .then(function(content) {

        //   Array.from(content).forEach(element => {
        //     if (element.constructor.name == "HTMLParagraphElement")
        //       console.log(element.innerText);
        //   });

        //   done();
        // })
        .catch(done);
    });
  });
});
