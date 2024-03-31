"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  bookingStatus: boolean;
  pickTime?: number;
  mobileNumber: number;
  bookingTime: number;
}

interface DashboardProps {
  params: { slug: string };
}

export default function Dashboard({ params }: DashboardProps) {
  const emailId = decodeURIComponent(params.slug);
  const [userName, setUsername] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  const logoutButton = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logged out");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("/api/driver/dashboard", { emailId });

        const bookings = response.data.bookings;

        setBookings(bookings);

        setUsername(response.data.user.username);
      } catch (error) {
        console.log("Error");
      }
    };
    getData();
  }, [emailId]);

  const pendingBookings = bookings.filter((booking) => booking.bookingStatus);

  // State to track whether to show all bookings or only pending bookings
  const [showAllBookings, setShowAllBookings] = useState(false);

  // Function to toggle between showing all bookings and pending bookings
  const toggleShowAllBookings = () => {
    setShowAllBookings((prevState) => !prevState);
  };

  // Determine which bookings to display based on the showAllBookings state
  const displayedBookings = showAllBookings ? bookings : pendingBookings;

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="text-6xl font-extrabold mb-20 flex flex-col justify-center items-center">
        <span className="capitalize mb-6">Hello {userName} </span>
        <span className="capitalize text-3xl">Check out the Bookings</span>
      </div>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest Bookings
          </h5>
          <a
            href="#"
            onClick={toggleShowAllBookings}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {showAllBookings ? "Show Pending Only" : "View all"}
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {displayedBookings.map((booking, index) => (
              <li className="py-3 sm:py-4" key={index}>
                <div className="flex items-center">
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {booking.firstName} {booking.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {booking?.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {booking?.mobileNumber}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {booking && booking.bookingTime
                        ? new Date(booking.bookingTime).toLocaleString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )
                        : ""}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {booking.bookingStatus ? "Pending" : "Completed"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
