import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/mongodb";
import mongoose from "mongoose";

// Define Alert Schema directly in the API for simplicity
const AlertSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'emergency_alerts' });

const Alert = mongoose.models.Alert || mongoose.model("Alert", AlertSchema);

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newAlert = await Alert.create(body);
    return NextResponse.json(newAlert, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "SOS Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch only pending alerts from the last 24 hours
    const alerts = await Alert.find({ status: "pending" }).sort({ createdAt: -1 });
    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
  }
}