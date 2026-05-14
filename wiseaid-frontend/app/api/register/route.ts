import { connectToDatabase } from "@/src/lib/mongodb";
import Patient from "@/src/models/Patient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { fullName, email, password, age, phone, area } = body;

    // 1. Check if email exists in Patient collection
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create Patient
    const newPatient = await Patient.create({
      fullName,
      email,
      password: hashedPassword,
      age: Number(age),
      phone,
      area,
    });

    return NextResponse.json({ success: true, message: "Patient Created" }, { status: 201 });
  } catch (err: any) {
    console.error("API ERROR:", err.message);
    return NextResponse.json({ error: "Server error: " + err.message }, { status: 500 });
  }
}