const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    console.log("Connecting to MongoDB with URL:", process.env.DB_URL); 

    process.exit(1);
  }
};

module.exports = connectDB;
