const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      trim: true,
      minLength: [2, "Evant name must be at least 2 characters."],
      maxLenght: [50, "User name is too large"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    eventTime: {
      type: String,
      required: [true, "Event time is required"],
    },
    eventPlace: {
      type: String,
    },
    eventDetails: {
      type: String,
      required: [true, "Event details is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", EventSchema);

module.exports = Event;
