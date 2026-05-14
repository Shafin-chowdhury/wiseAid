import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// The third argument "admins" forces Mongoose to use that exact collection name
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admins");