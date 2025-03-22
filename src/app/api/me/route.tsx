import { connectToDatabase } from "@/lib/connectDB";
import { About } from "@/models/About.model";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const me = await About.findById("67d47621f621d6592e4c6fd7");

    return NextResponse.json({
      ok: true,
      message: "Fetched Projects successful",
      me: me,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "Fetch Failed",
      status: 500,
    });
  }
}
