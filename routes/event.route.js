const express = require("express");
const {
  postEvent,
  getAllEvents,
  getEvent,
  deleteEvent,
  eventUpdate,
} = require("../controllers/event.controller");
const varifyToken = require("../middleware/varifyToken");
const authorization = require("../middleware/authorization");
const varifyStaffToken = require("../middleware/varifyStaffToken");
const router = express.Router();

router.get("/", varifyToken || varifyStaffToken, getAllEvents);
router.get("/:id", varifyToken || varifyStaffToken, getEvent);

// event managment only admin
router.patch("/:id", varifyToken, authorization("admin"), eventUpdate);
router.delete("/:id", varifyToken, authorization("admin"), deleteEvent);
router.post("/create", varifyToken, authorization("admin"), postEvent);

module.exports = router;
