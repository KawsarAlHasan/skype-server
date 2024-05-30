const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const StaffSchema = mongoose.Schema(
  {
    staffName: {
      type: String,
      required: [true, "Please Provide Staff Name"],
      trim: true,
      minLength: [3, "Staff name must be at least 3 characters."],
      maxLenght: [30, "User name is too large"],
    },

    staffId: {
      type: String,
      required: [true, "Please Provide Staff ID"],
      trim: true,
    },

    staffPosition: {
      type: String,
      trim: true,
    },

    staffEmail: {
      type: String,
      required: [true, "Please provide a Staff Email."],
      trim: true,
      lowercase: true,
      unique: [true, "Email must be unique"],
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

StaffSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  next();
});

const Staff = mongoose.model("Staffs", StaffSchema);

module.exports = Staff;
