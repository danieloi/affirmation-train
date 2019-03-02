const Nightmare = require("nightmare");

async function getAffirmation() {
  let nightmare = new Nightmare({ show: true });
  //   let nightmare = new Nightmare();

  try {
    const result = await nightmare
      .goto("https://www.affirmation-train.org/category/affirmation")
      .wait(".more-link")
      .wait(2000)
      .click(".more-link")
      .wait(".entry")
      .wait(3000)
      .evaluate(() => {
        return [...document.querySelector(".entry").children].map(element => {
          if (
            element.constructor.name == "HTMLParagraphElement" &&
            element.innerText
          )
            return element.innerText;
        });
      })
      .end();

    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

getAffirmation().then(results => {
  console.log(results);
});
