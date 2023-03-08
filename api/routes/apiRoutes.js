let apiController = require("../controllers/apiController");

module.exports = function (app) {
  // API

  app.post("/api/log", apiController.apiLog);

  app.post("/api/attendance/:id", apiController.attendance);
};
