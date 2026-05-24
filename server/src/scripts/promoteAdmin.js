/* Promote an existing user to admin (or demote with --demote).

   Usage:
     npm --prefix server run promote -- alice@example.com
     npm --prefix server run promote -- alice@example.com --demote */
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { User } from "../models/User.js";

const args = process.argv.slice(2);
const email = args.find((a) => !a.startsWith("--"));
const demote = args.includes("--demote");

if (!email) {
  console.error("Usage: npm run promote -- <email> [--demote]");
  process.exit(1);
}

await connectDB();
const user = await User.findOne({ email: email.toLowerCase().trim() });
if (!user) {
  console.error(`No user with email "${email}"`);
  await mongoose.disconnect();
  process.exit(1);
}
const target = demote ? "user" : "admin";
if (user.role === target) {
  console.log(`${email} is already ${target}; nothing to do.`);
} else {
  user.role = target;
  await user.save();
  console.log(`${demote ? "Demoted" : "Promoted"} ${email} to ${target}.`);
}
await mongoose.disconnect();
