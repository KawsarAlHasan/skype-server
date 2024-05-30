const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      trim: true,
      minLength: [3, "Staff name must be at least 3 characters."],
      maxLenght: [30, "User name is too large"],
    },
    email: {
      type: String,
      required: [true, "Please provide a Staff Email."],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
