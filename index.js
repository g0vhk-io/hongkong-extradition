"use strict";

const localNewsLoader = new ArticleLoader("https://www.collaction.hk/api/extradition_objective?token=mzFly3aDBwWQpnJaHol60A2I9lYccTLy92lyN3QorQbfgLkO5ifxauPOuBF1");
const foreignNewsLoader = new ArticleLoader();

window.addEventListener(
  "load",
  () => {
    localNewsLoader
      .initialize()
      .then(
        () => {
          let innerHTML = localNewsLoader.get(10)
            .reduce(
              (acc, val, idx, arr) => {
                acc += val;
                if (idx + 1 < arr.length) {
                  acc += `<hr class="bg-white">`;
                }
                return acc;
              },
              ""
            );
          document.getElementById("articles").innerHTML = innerHTML;
          if (
            localNewsLoader.articles.length <= 10 ||
            localNewsLoader.currentIndex >= localNewsLoader.articles.length - 1
          ) {
            document.getElementById("load-more").classList.add("d-none");
          }
        },
        () => {
          document.getElementById("articles").innerHTML = ``;
        }
      );
  }
);

document
  .getElementById("news")
  .addEventListener(
    "click",
    (evt) => {
      if (evt.target.id === "load-more") {
        let addition = localNewsLoader
          .get(10)
          .reduce(
            (acc, val, idx, arr) => {
              acc += val;
              if (idx + 1 < arr.length) {
                acc += `<hr class="bg-white">`;
              }
              return acc;
            },
            ""
          );
        if (addition.length > 0) {
          document.getElementById("articles").innerHTML += `<hr class="bg-white">`;
          document.getElementById("articles").innerHTML += addition;
        } else {
          document.getElementById("load-more").classList.add("d-none");
        }
      }
    }
  );
