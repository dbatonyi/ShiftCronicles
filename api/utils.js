const fs = require("fs");

var utils = (module.exports = {});

utils.checkConfigFileIsEmpty = function (obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object") {
        if (utils.checkConfigFileIsEmpty(value)) {
          return true;
        }
      } else {
        if (value === "") {
          return true;
        }
      }
    }
  }
  return false;
};
