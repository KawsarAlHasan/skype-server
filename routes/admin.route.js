const express = require("express");
const {
  loginAdmin,
  getMe,
  emailUpdate,
} = require("../controllers/admin.cotroller");
const varifyToken = require("../middleware/varifyToken");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/", loginAdmin);
router.patch("/:id", varifyToken, authorization("admin"), emailUpdate);
router.get("/me", varifyToken, authorization("admin"), getMe);

module.exports = router;
