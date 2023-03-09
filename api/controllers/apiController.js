const config = require("../config")["api"];

let utils = require("../helpers/utils");
const userStatus = require("../models/userStatus");

var exports = (module.exports = {});

exports.apiLog = async function (req, res) {
  const { Log } = require("../models");
  const { logMessage, logLevel } = req.body;

  const authenticateToken = req.headers["authenticate"];

  if (!authenticateToken || config.apiToken !== authenticateToken.slice(7)) {
    return res.send({ message: "API token not valid!" });
  }

  try {
    const log = await Log.create({
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

exports.attendance = async function (req, res) {
  const { UserStatus } = require("../models");

  var userUuid = req.params.id;

  const authenticateToken = req.headers["authenticate"];

  if (!authenticateToken || config.apiToken !== authenticateToken.slice(7)) {
    return res.send({ message: "API token not valid!" });
  }

  function minutesPassedBetweenDates(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes;
  }

  async function updateUserStatus(userUuid, userStatus, startTime, totalTime) {
    let updatedFields = {};

    if (userStatus === "Arrived") {
      updatedFields = {
        userStatus: "Left",
        endTime: new Date(),
        totalTime: minutesPassedBetweenDates(startTime, new Date()) + totalTime,
      };
    }

    if (userStatus === "Left") {
      updatedFields = {
        userStatus: "Arrived",
        startTime: new Date(),
      };
    }

    try {
      const [numAffectedRows] = await UserStatus.update(updatedFields, {
        where: {
          userUuid,
        },
      });
      utils.writeToLogFile(`${numAffectedRows} row(s) updated`, "info");
      return res.send({
        message: `Successfully checked ${
          userStatus === "Arrived" ? "out" : "in"
        }!`,
      });
    } catch (error) {
      utils.writeToLogFile(error, "error");
      return res.send({ message: "Something went wrong!" });
    }
  }

  try {
    const userAttendance = await UserStatus.findOne({
      where: { uuid: userUuid },
    });

    const { userStatus, startTime, totalTime } = await userAttendance.toJSON();

    updateUserStatus(userUuid, userStatus, startTime, totalTime);
  } catch (error) {
    utils.writeToLogFile(error, "error");
    return res.send({ message: "Something went wrong!" });
  }
};
