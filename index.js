const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");
const { dbConnect } = require("./utils/dbConnect");

// database connection
dbConnect();

/**
 * admin: admin@gmail.com
 * password: Admin@123
 *
 * Defult Admin: admin2@gmail.com
 * Defult Password: 123456
 */

// server
const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Skype server is running on port ${port}`.blue.bold);
});
