"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/helpers/loadingpage/loading";

export default function SignupPage() {
  const Router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    isDriver: false,
    isAvailable: true,
  });
  const [userTypes, setUserTypes] = useState("Select user types");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (details.password !== confirmPassword) {
      throw new Error("Passwords doesnt match");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", details);
      console.log(details);
      Router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex text-5xl items-center mb-10 justify-center my-10">
        <span className="text-nowrap font-extrabold">
          Office Cab Booking Portal
        </span>
      </div>
      <form className="max-w-sm  mx-auto h-1/2 pb-20 pt-20 content-center justify-center items-center">
        <div className="flex text-3xl items-center mb-10">
          <span>
            {loading ? <Loading key="1" text="Signing up ..." /> : "Signup"}
          </span>
        </div>
        <div className="relative z-0 w-80 mb-5 group">
          <select
            name="shift_time"
            id="shift_time"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            onChange={(e) =>
              setDetails({ ...details, isDriver: e.target.value === "Driver" })
            }
          >
            <option value="Select User Type">Select user Type</option>
            <option value="Employee">Employee</option>
            <option value="Driver">Driver</option>
          </select>
          <label
            htmlFor="shift_time"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Account Type
          </label>
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="johndoe"
            required
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="name@email.com"
            required
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
        </div>
        <div className=" w-full mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <div className="flex flex-row gap-3">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className=" w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
            <Image
              width={40}
              height={40}
              className="cursor-pointer"
              src={showPassword ? "/so.svg" : "/no.svg"}
              alt=""
              style={{ height: "40px", width: "40px" }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm your password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-400 focus:ring-4 focus:ring-white dark:focus:ring-white"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
        <div className="flex flex-row pt-5 gap-5">
          <span>Already have an account?</span>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
