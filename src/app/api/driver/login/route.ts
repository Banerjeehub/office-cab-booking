import { Users } from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await Users.findOne({ email, isDriver: true });

    if (!user) {
      return NextResponse.json(
        { error: "User not found or You are not a driver" },
        { status: 404 }
      );
    }

    //validate user

    const validatePassword = await bycryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const tokenOne = jwt.sign(tokenData, process.env.SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
      user,
    });

    response.cookies.set("tokenOne", tokenOne, {
      httpOnly: true,
    });
    response.cookies.set("accountType", "Driver", {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
