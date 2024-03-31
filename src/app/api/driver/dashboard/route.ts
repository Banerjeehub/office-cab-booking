import { NextRequest, NextResponse } from "next/server";
import { Users, Booking } from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const { emailId } = await req.json();
    console.log("Email received:", emailId);

    const user = await Users.findOne({ email: emailId });
    if (!user) {
      console.log("User not found for email:", emailId);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);

    const bookings = await Booking.find({ driverId: user._id });
    console.log("Bookings found:", bookings);

    return NextResponse.json({ message: "Got the user", user, bookings });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}
