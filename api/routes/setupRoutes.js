let setupController = require("../controllers/setupController");

module.exports = function (app) {
  // Setup

  app.get("/api/configuration-check", setupController.configurationCheck);

  app.post("/api/installer", setupController.apiInstaller);
};
