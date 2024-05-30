const jwt = require("jsonwebtoken");
exports.generateStaffToken = (staffInfo) => {
  const payload = {
    staffEmail: staffInfo.staffEmail,
  };
  const staffToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30days",
  });

  return staffToken;
};
