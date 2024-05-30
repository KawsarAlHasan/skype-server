const Event = require("../models/event.model");

exports.getAllEvents = async (req, res, next) => {
  try {
    const result = await Event.find({});
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get all events",
      error: error.message,
    });
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Event.findById(id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get the event",
      error: error.message,
    });
  }
};

exports.postEvent = async (req, res, next) => {
  try {
    const result = await Event.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Event added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Event added Unseccess",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Event.deleteOne({ _id: id });
    res.status(200).json({
      status: "Success",
      message: "Event Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Event Deleted Unseccess",
      error: error.message,
    });
  }
};

exports.eventUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    const result = await event.set(req.body).save();
    res.status(200).json({
      status: "Success",
      message: "Event Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Event Updated Unseccess",
      error: error.message,
    });
  }
};
