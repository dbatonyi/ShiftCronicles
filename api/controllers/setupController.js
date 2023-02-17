let utils = require("../utils");

//test config

const testconfig = require("../../config-example");

var exports = (module.exports = {});

exports.checkConfig = async function (req, res) {
  const configCheck = utils.checkConfigFileIsEmpty(testconfig);

  if (configCheck) {
    return res.json({ configFileEmpty: true });
  } else {
    return res.json({ configFileEmpty: false });
  }
};
