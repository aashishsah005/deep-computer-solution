// One-time script to create the first owner admin account.
// Run with: node seed.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const email = process.argv[2] || "owner@deepcomputer.com";
  const password = process.argv[3] || "changeme123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  await Admin.create({
    name: "Shop Owner",
    email,
    password,
    role: "owner",
  });

  console.log(`Owner admin created -> email: ${email}  password: ${password}`);
  console.log("IMPORTANT: log in and change this password immediately.");
  process.exit(0);
};

run();
