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
const router = express.Router();

router.route("/:id").get(getStaff);
router.delete("/:id", varifyToken, authorization("admin"), deleteStaff);
router.route("/").get(getAllStaffs);
router.patch("/:id", varifyToken, authorization("admin"), staffUpdate);
router.post("/login", staffLogin);
router.post("/create", varifyToken, authorization("admin"), createStaff);

module.exports = router;
