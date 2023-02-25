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

utils.writeToLogFile = function (data, level) {
  const currentDate = new Date();

  let fileName = "";
  if (level === "error") {
    fileName = "./logs/error.log";
  } else if (level === "warning") {
    fileName = "./logs/warning.log";
  } else {
    fileName = "./logs/info.log";
  }

  try {
    fs.accessSync(fileName, fs.constants.F_OK);
  } catch (err) {
    fs.writeFileSync(fileName, "");
  }

  const logMessage = `${currentDate.toISOString()}: ${data}\n`;

  fs.appendFileSync(fileName, logMessage);
};
