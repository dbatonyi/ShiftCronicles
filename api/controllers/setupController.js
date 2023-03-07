const fs = require("fs");

let utils = require("../helpers/utils");

const config = require("../config");

var exports = (module.exports = {});

exports.maintenanceMode = async function (req, res) {
  const configCheck = utils.checkConfigFileIsEmpty(config);

  if (configCheck) {
    return res.json({
      status: "error",
      message: "API is in maintenance mode",
      errorCode: "CONFIG_EMPTY",
    });
  }

  return res.json({
    message: "API is in maintenance mode",
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
    adminEmail,
    adminFirstname,
    adminLastname,
    adminPassword,
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
  config.adminCredentials.adminEmail = adminEmail;
  config.adminCredentials.adminFirstname = adminFirstname;
  config.adminCredentials.adminLastname = adminLastname;
  config.adminCredentials.adminPassword = adminPassword;

  const filePath = path.join(__dirname, "config.js");

  fs.writeFileSync(
    filePath,
    `module.exports = ${JSON.stringify(config, null, 2)};`
  );

  utils.writeToLogFile("Configuration saved to config.js", "info");
  console.log("Configuration saved to config.js");

  res.json({
    status: "ok",
    message: "API config saved",
  });

  utils.writeToLogFile("Server shutdown due to new config file", "info");
  console.log("Server shutdown due to new config file");

  return process.kill(process.pid, "SIGTERM");
};
