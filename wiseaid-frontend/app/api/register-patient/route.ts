import { connectToDatabase } from "@/src/lib/mongodb";
import Patient from "@/src/models/patient"; // Matches your filename in screenshot
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Destructure the data coming from your frontend form
    const { fullName, email, password, age, phone, area } = body;

    // Check if patient exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the patient in the 'patients' collection
    const newPatient = await Patient.create({
      fullName,
      email,
      password: hashedPassword,
      age: Number(age),
      phone,
      area,
      role: "patient"
    });

    return NextResponse.json({ success: true, user: newPatient }, { status: 201 });
  } catch (err: any) {
    console.error("REGISTRATION ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}