import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbconfig";
import { Users } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await Users.findOne({ _id: userId });
    return NextResponse.json({ message: "user found", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while working" },
      { status: 400 }
    );
  }
}
