const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in",
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "fobidden access" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    res.status(403).json({
      status: "fail",
      message: "Invalid token",
      error: error.message,
    });
  }
};
