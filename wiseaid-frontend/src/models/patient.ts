import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "" },
  age: { type: Number },
  phone: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  diseases: { type: [String], default: [] },
  liveLocation: {
    lat: Number,
    lng: Number,
    address: String, // General Area
  },
  detailedAddress: {
    houseNumber: { type: String, required: true },
    floor: { type: String, required: true }, // Added Floor
    apartment: { type: String },           // Added Flat/Apt
    additionalNotes: { type: String }      // Landmarks
  },
  onboardingComplete: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema, "patients");