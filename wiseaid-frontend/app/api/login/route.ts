import { connectToDatabase } from "../../../src/lib/mongodb";
import Admin from "../../../src/models/admin"; 
import bcrypt from "bcryptjs";
import { z } from "zod";
import { NextResponse } from "next/server";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Simple Validation
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      // Improved: This will never crash even if errors array is empty
      return NextResponse.json({ 
        error: "Validation Failed: Check email format and password length (min 8)." 
      }, { status: 400 });
    }

    const { email, password } = validation.data;

    // 2. Database Connection
    await connectToDatabase();

    // 3. Find Admin
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return NextResponse.json({ error: "No admin account found with this email." }, { status: 401 });
    }

    // 4. Password Match
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    // SUCCESS
    return NextResponse.json({ success: true, role: admin.role });

  } catch (err: any) {
    console.error("SERVER CRASH DETAILS:", err); 
    return NextResponse.json({ error: "Internal Server Error: " + err.message }, { status: 500 });
  }
}