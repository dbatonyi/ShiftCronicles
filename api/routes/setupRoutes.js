let setupController = require("../controllers/setupController");

module.exports = function (app) {
  // Setup

  app.get("/api/maintenance-mode", setupController.maintenanceMode);

  app.post("/api/installer", setupController.apiInstaller);
};
