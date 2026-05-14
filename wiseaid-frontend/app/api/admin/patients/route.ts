import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/mongodb";
import Patient from "@/src/models/patient";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all patients, sorted by the most recent registration
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}