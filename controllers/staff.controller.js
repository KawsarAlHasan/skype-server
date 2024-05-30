const Staff = require("../models/staff.model");
const bcrypt = require("bcryptjs");
const { generateStaffToken } = require("../utils/staffToken");

// create staff
exports.createStaff = async (req, res, next) => {
  try {
    const result = await Staff.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Staff added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Staff added Unseccess",
      error: error.message,
    });
  }
};

// get all staffs
exports.getAllStaffs = async (req, res, next) => {
  try {
    const staffs = await Staff.find({});
    res.status(200).json({
      status: "Success",
      data: staffs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get Staffs",
      error: error.message,
    });
  }
};

// staff login
exports.staffLogin = async (req, res, next) => {
  try {
    const { staffEmail, password } = req.body;

    if (!staffEmail || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const staff = await Staff.findOne({ staffEmail });

    if (!staff) {
      return res.status(401).json({
        status: "fail",
        error: "Email and Password is not correct",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, staff.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Email and Password is not correct",
      });
    }
    const staffToken = generateStaffToken(staff);

    const { password: pwd, ...others } = staff.toObject();

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        staff: others,
        staffToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Staff Login Unseccess",
      error: error.message,
    });
  }
};

// get staff
exports.getStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Staff.findById(id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the Staff",
      error: error.message,
    });
  }
};

// staff Update
exports.staffUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    const result = await staff.set(req.body).save();
    res.status(200).json({
      status: "Success",
      message: "Staff Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Staff Updated Unseccess",
      error: error.message,
    });
  }
};

// staff delete
exports.deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Staff.deleteOne({ _id: id });
    res.status(200).json({
      status: "Success",
      message: "Staff Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: "Staff Delete Unsuccess",
      error: error.message,
    });
  }
};
