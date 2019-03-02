const Nightmare = require("nightmare");

let nightmare = new Nightmare();

const title = nightmare
  .goto("https://www.affirmation-train.org/category/affirmation")
  .click(".more-link")
  .wait(5000)
  .title();

console.log(title);