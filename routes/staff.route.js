const express = require("express");
const {
  createStaff,
  getAllStaffs,
  getStaff,
  deleteStaff,
  staffLogin,
  staffUpdate,
} = require("../controllers/staff.controller");
const varifyToken = require("../middleware/varifyToken");
const authorization = require("../middleware/authorization");
const varifyStaffToken = require("../middleware/varifyStaffToken");
const router = express.Router();

router.post("/", staffLogin);
router.get("/:id", varifyToken || varifyStaffToken, getStaff);
router.delete("/:id", varifyToken, authorization("admin"), deleteStaff);
router.get("/", varifyToken || varifyStaffToken, getAllStaffs);
router.patch("/:id", varifyToken, authorization("admin"), staffUpdate);
router.post("/create", varifyToken, authorization("admin"), createStaff);

module.exports = router;
