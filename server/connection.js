const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb://mongo:EPgiwLKYaQZDBisJRuRcdHWqAlUKiYbL@hopper.proxy.rlwy.net:52540"
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(`Error connecting to MongoDB: ${e.message}`);
    process.exit(1);
  }
};
