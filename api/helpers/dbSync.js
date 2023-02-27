let utils = require("./utils");

var dbSync = (module.exports = {});

async function createDefaultLogLevels() {
  const { LogLevel } = require("../models");

  const defaultLogLevels = ["info", "warning", "error"];

  for (const levelName of defaultLogLevels) {
    const [level, created] = await LogLevel.findOrCreate({
      where: { name: levelName },
    });
    if (created) {
      utils.writeToLogFile(
        `Created log level "${levelName}" with id ${level.id}`,
        "info"
      );
      console.log(`Created log level "${levelName}" with id ${level.id}`);
    }
  }
}

dbSync.populateDBTables = async function () {
  createDefaultLogLevels();

  utils.writeToLogFile("DB tables populated!", "info");
  console.log("DB tables populated!");
};
