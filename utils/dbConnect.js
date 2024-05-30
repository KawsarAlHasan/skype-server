const mongoose = require("mongoose");

exports.dbConnect = async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log(`the db is connected`.green.bold);
};
