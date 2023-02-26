const config = require("../../config")["api"];

let utils = require("../utils");

var exports = (module.exports = {});

exports.apiLogs = async function (req, res) {
  const { Logs } = require("../models");
  const { logMessage, logLevel } = req.body;

  console.log(logMessage, logLevel);

  const authenticateToken = req.headers["authenticate"];

  if (!authenticateToken || config.apiToken !== authenticateToken.slice(7)) {
    return res.send({ message: "API token not valid!" });
  }

  try {
    const log = await Logs.create({
      logMessage,
      logLevel,
    });

    return res.send({
      message: "Log saved!",
    });
  } catch (error) {
    utils.writeToLogFile(error, "error");
    return res.send({ message: "Something went wrong!" });
  }
};
