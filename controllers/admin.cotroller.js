const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        status: "fail",
        error: "Email and Password is not correct",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Email and Password is not correct",
      });
    }
    const token = generateToken(admin);

    const { password: pwd, ...others } = admin.toObject();

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        admin: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Admin Login Unseccess",
      error: error.message,
    });
  }
};

// update admin
exports.emailUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    const result = await admin.set(req.body).save();
    res.status(200).json({
      status: "Success",
      message: "Admin Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Admin Updated Unseccess",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const { decoded } = req?.decoded?.email;
    const admin = await Admin.findOne({ decoded });
    res.status(200).json({
      status: "Success",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
