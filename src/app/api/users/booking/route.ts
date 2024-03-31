import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import { Users, Booking } from "@/models/userModel";
import mongoose from "mongoose";
import generateUniqueId from "generate-unique-id";
import otpGenerator from "otp-generator";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, phoneNumber, pickUpTime, dropOffTime, firstName, lastName } =
      reqBody;

    // Find an available and verified driver
    const driver = await Users.findOne({
      isDriver: true,
      isAvailable: true,
      isVerified: true,
    });

    if (!driver) {
      return NextResponse.json({
        message: "No available and verified driver found",
      });
    }

    const pickTime = parseTime(pickUpTime);
    const dropTime = parseTime(dropOffTime);

    // Create a new booking with a new ObjectId
    const bookingId = generateUniqueId({
      length: 12,
    });
    const newBooking = new Booking({
      _id: new mongoose.Types.ObjectId(),
      bookingTime: new Date(),
      bookingId: bookingId,
      pickTime: pickTime,
      dropTime: dropTime,
      email: email,
      mobileNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      driverId: driver._id,
    });

    // Save the booking
    await newBooking.save();

    // Push only the bookingId into the driver's bookings array
    driver.bookings.push(newBooking._id);

    // Save the updated driver document
    driver.isAvailable = false;
    await driver.save();

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    sendEmail;

    return NextResponse.json({ message: "API call successful", driver, otp });
  } catch (error: any) {
    console.log("Backend error: " + error.message);
    return NextResponse.json({ error: "Backend error: " + error.message });
  }
}

function parseTime(timeString: any) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  return currentDate;
}
