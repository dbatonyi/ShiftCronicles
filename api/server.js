const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config")["api"];

//CORS
app.use(
  cors({
    credentials: true,
    origin: [config.frontendUrl],
  })
);

//JSON
app.use(express.json());

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Models
const models = require("./models");

//Sync Database

(async function () {
  try {
    const syncDB = await models.sequelize.sync();
    console.log("Nice! Database looks fine");
  } catch (error) {
    console.log(error, "Something went wrong with the Database Update!");
  }
})();

//Create server
app.listen(5000, function (err) {
  if (!err) console.log("Site is live: http://localhost:5000");
  else console.log(err);
});
