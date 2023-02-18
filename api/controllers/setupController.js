const fs = require("fs");

let utils = require("../utils");

//test config

const config = require("../../config");

var exports = (module.exports = {});

exports.configurationCheck = async function (req, res) {
  const configCheck = utils.checkConfigFileIsEmpty(config);

  if (configCheck) {
    return res.json({
      status: "error",
      message: "API is not properly configured.",
      errorCode: "CONFIG_EMPTY",
    });
  }

  return res.json({
    status: "error",
    message: "API not working",
    errorCode: "API_ERROR",
  });
};

exports.apiInstaller = async function (req, res) {
  const {
    username,
    password,
    database,
    host,
    dialect,
    frontendUrl,
    smtpHost,
    smtpEmail,
    smtpPassword,
    jwtkey,
    apiToken,
  } = req.body;

  // Set the properties of the configuration object
  config.database.username = username;
  config.database.password = password;
  config.database.database = database;
  config.database.host = host;
  config.database.dialect = dialect;
  config.api.frontendUrl = frontendUrl;
  config.api.smtpHost = smtpHost;
  config.api.smtpEmail = smtpEmail;
  config.api.smtpPassword = smtpPassword;
  config.api.jwtkey = jwtkey;
  config.api.apiToken = apiToken;

  const filePath = "/shiftcronicles/config.js";

  fs.writeFileSync(
    filePath,
    `module.exports = ${JSON.stringify(config, null, 2)};`
  );

  console.log("Configuration saved to config.js");

  res.json({
    status: "ok",
    message: "API config saved",
  });

  console.log("Server shutdown");

  return process.kill(process.pid, "SIGTERM");
};
