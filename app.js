const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const adminRoute = require("./routes/admin.route");
const staffRoute = require("./routes/staff.route");
const eventRoute = require("./routes/event.route");

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/event", eventRoute);

app.get("/", (req, res) => {
  res.send("Skype server is running");
});

module.exports = app;
