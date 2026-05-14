import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/mongodb";
import Patient from "@/src/models/patient";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, diseases, bloodGroup, guardianName, guardianPhone, detailedAddress } = body;

    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { 
        diseases, 
        bloodGroup, 
        guardianName, 
        guardianPhone, 
        detailedAddress,
        profileCompleted: true 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedPatient });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}