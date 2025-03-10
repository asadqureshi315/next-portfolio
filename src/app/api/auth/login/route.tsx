import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/Users.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        ok: false,
        message: "User Not Found",
        status: 401,
      });
    }
    const verifyPwd = await bcrypt.compare(password, user.password);
    if (!verifyPwd) {
      return NextResponse.json({
        ok: false,
        message: "Invalid Credentials",
        status: 401,
      });
    }

    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    };
    console.log(userWithoutPassword);

    return NextResponse.json({
      ok: true,
      message: "Login successful",
      user: userWithoutPassword,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "Login Failed",
      status: 500,
    });
  }
}
