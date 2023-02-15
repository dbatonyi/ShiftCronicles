const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./controller/authController");
const socketServer = require("./socket");
const config = require("../config")["api"];

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

//Models
const models = require("./models");

//Sync Database
models.sequelize
  .sync()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    socketServer.listen(server);
  })
  .catch((error) => {
    console.log(error);
  });
