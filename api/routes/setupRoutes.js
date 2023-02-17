let setupController = require("../controllers/setupController");

module.exports = function (app) {
  // Setup

  app.get("/api/check-config", setupController.checkConfig);
};
