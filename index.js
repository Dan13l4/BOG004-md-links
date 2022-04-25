const utils = require("./src/links.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let arrayLinks = [];

    if (!utils.existRoute(path)) {
      reject("Route not exist")
    }
  })
};
