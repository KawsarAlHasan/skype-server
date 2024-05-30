module.exports = (...role) => {
  return (req, res, next) => {
    const adminRole = req.decoded.role;
    if (role.includes(adminRole)) {
      return res.status(403).json({
        status: "fail",
        error: "You are not authorized to access this",
      });
    }

    next();
  };
};
