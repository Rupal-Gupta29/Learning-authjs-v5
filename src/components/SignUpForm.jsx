import React from "react";
import Link from "next/link";
import { useState } from "react";

const SignUpForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <form className="space-y-6">
      <div>
        <label className="text-gray-600 text-sm mb-2 block">Name</label>
        <div className="relative flex items-center">
          <input
            name="name"
            type="text"
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
            placeholder="Enter name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="text-gray-600 text-sm mb-2 block">Email Id</label>
        <div className="relative flex items-center">
          <input
            name="email"
            type="email"
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
            placeholder="Enter email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="text-gray-600 text-sm mb-2 block">Password</label>
        <div className="relative flex items-center">
          <input
            name="password"
            type="password"
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
            placeholder="Enter password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
        >
          Create an account
        </button>
      </div>
      <p className="text-gray-600 text-sm mt-6 text-center">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
