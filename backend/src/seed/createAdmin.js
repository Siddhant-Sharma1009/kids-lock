import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/hash.js";

dotenv.config();

await connectDB();

const username = "parent";
const password = "parent123";

const exists = await User.findOne({ username });
if (exists) {
  console.log("Admin already exists");
  process.exit();
}

await User.create({
  username,
  passwordHash: await hashPassword(password),
  exitSequence: ["e", "x", "i", "t"]
});

console.log("✅ Parent account created");
process.exit();
