/**
 * commented pieces of code were used
 * at different phases in pulling data for
 * different purposes. They aren't useless!!!
 */

const Nightmare = require("nightmare");
const db = require("./db");

// async function pullAllLinksonPage(page) {
//   let nightmare = new Nightmare({ show: true });

//   try {
//     const result = await nightmare
//       .goto(
//         page == 1
//           ? `https://www.affirmation-train.org/category/affirmation`
//           : `https://www.affirmation-train.org/category/affirmation/page/${page}/`
//       )
//       .wait(".more-link")
//       .evaluate(() => {
//         const hrefs = [...document.querySelectorAll(".more-link")].map(
//           element => element.href
//         );

//         // const results = Promise.all(promises);
//         return hrefs;
//       })
//       .end();

//     return result;
//   } catch (e) {
//     console.error(e);
//     return undefined;
//   }
// }

// function gatherLinks() {
//   pullAllLinksonPage(i).then(results => {
//     links.push(...results);

//     db.get("links")
//       .push(...results)
//       .write();
//     console.log(links);
//     i++;
//     if (i < 76) {
//       gatherLinks();
//     }
//   });
// }

// gatherLinks();

async function pullContentFromPage(page) {
  let nightmare = new Nightmare();

  try {
    const result = await nightmare
      .goto(page)
      .wait(".entry")
      .evaluate(() => {
        return [...document.querySelector(".entry").children].map(element => {
          if (
            element.constructor.name == "HTMLParagraphElement" &&
            element.innerText
          ) {
            return element.innerText;
          }
        });
      })
      .end();

    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// let i = 731;
// links = db.get("links").value();

function fillPostsWithContent() {
  // check for post within db without content key
  const withoutContent = db
    .get("posts")
    .find(function(p) {
      return !p.content;
    })
    .value();
  if (withoutContent) {
    console.log(withoutContent);
    //terminating condition for recursion
    //pull content from link and update entry in db then run function again
    pullContentFromPage(withoutContent.link).then(content => {
      db.get("posts")
        .find({ link: withoutContent.link })
        .assign({ link: withoutContent.link, content })
        .write();
      fillPostsWithContent();
    });
  }
}

fillPostsWithContent();

// function fetchPosts() {
//   pullContentFromPage(links[i]).then(content => {
//     db.get("posts")
//       .push({ link: links[i], content })
//       .write();
//     i++;
//     if (i < links.length) {
//       fetchPosts();
//     }
//   });
// }

// fetchPosts();

// {
//   return await nightmare
//     .goto(element.href)
//     .wait(".entry")
//     .wait(2000)
//     .evaluate(() => {
//       return [...document.querySelector(".entry").children].map(
//         element => {
//           if (
//             element.constructor.name == "HTMLParagraphElement" &&
//             element.innerText
//           ) {
//             return element.innerText;
//           }
//         }
//       );
//     });
// }
