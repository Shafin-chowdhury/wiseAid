import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/lib/mongodb";
import Patient from "@/src/models/patient";

export async function GET(req: Request) {
  try {
    await connectToDatabase(); // Crucial to prevent the "buffering" error
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await Patient.findOne({ email });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}