const jwt = require("jsonwebtoken");
const config = require("../../config")["api"];

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "mysecretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;

    next();
  });
};

module.exports = authenticate;
