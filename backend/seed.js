const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

const seedOwner = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if an owner already exists
    const ownerExists = await User.findOne({ role: "Owner" });
    if (ownerExists) {
      console.log("Owner account already exists!");
      console.log(`Email: ${ownerExists.email}`);
      process.exit();
    }

    console.log("Creating Owner account...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const newOwner = new User({
      name: "System Owner",
      email: "owner@example.com",
      username: "owner",
      password: hashedPassword,
      role: "owner",
    });

    await newOwner.save();
    console.log("\n✅ Success! Owner account created.");
    console.log("-----------------------------------------");
    console.log("Role     : Owner");
    console.log("Email    : owner@example.com");
    console.log("Password : admin123");
    console.log("-----------------------------------------");
    console.log("Please login and change this password immediately.\n");
    
    process.exit();
  } catch (error) {
    console.error("Error creating owner account:", error);
    process.exit(1);
  }
};

seedOwner();
