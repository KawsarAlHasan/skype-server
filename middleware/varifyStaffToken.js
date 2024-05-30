const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const staffToken = req.headers?.authorization?.split(" ")?.[1];
    if (!staffToken) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in",
      });
    }

    jwt.verify(staffToken, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "fobidden access" });
      }
      req.staffemail = decoded;
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
