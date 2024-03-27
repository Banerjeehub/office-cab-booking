/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function profilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const [username, setUsername] = useState("");
  const handleClick = async () => {
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
      const res = await axios.get("/api/users/localData");

      const userData = res.data.user;

      setData(userData.email);
      setUsername(userData.username);
    };
    getData();
  }, [data]);

  return (
    <div className="h-lvh">
      <div className="flex justify-end pr-14 w-lvw">
        <button
          type="submit"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-2xl bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-white dark:focus:ring-white mt-5"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col mt-14 items-center justify-center">
        <div className="text-6xl font-extrabold mb-20 flex flex-col justify-center items-center">
          <span className="capitalize mb-6">Welcome {username}</span>
          <span className="capitalize text-3xl">Book your Cab</span>
        </div>

        <div className="max-w-md mx-auto">
          <form>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6 mt-14">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="shift_time"
                    id="shift_time"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option value="Select Pickup">Select Pickup Time</option>
                    <option value="7:00">7:00</option>
                    <option value="2:30">14:30</option>
                    <option value="10:00">22:00</option>
                  </select>
                  <label
                    htmlFor="shift_time"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Shift Time
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="shift_time"
                    id="shift_time"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option value="select Drop">Select Drop Off Time</option>
                    <option value="7:00">7:00</option>
                    <option value="2:30">14:30</option>
                    <option value="10:00">22:00</option>
                  </select>
                  <label
                    htmlFor="shift_time"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Shift Time
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
