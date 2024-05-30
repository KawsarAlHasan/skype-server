const jwt = require("jsonwebtoken");
exports.generateToken = (adminInfo) => {
  const payload = {
    email: adminInfo.email,
    role: adminInfo.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30days",
  });

  return token;
};
