"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        setErrors({});
        toast.success(result.message);
        router.push("/sign-in");
      } else if (!response.ok) {
        setErrors(result.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignUp}>
      {errors && errors?.server && (
        <p className="mt-2 text-sm text-red-600">{errors.server}</p>
      )}
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
        {errors && <p className="mt-2 text-sm text-red-600">{errors?.name}</p>}
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
        {errors && errors?.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
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
        {errors && errors?.password && (
          <p className="mt-2 text-sm text-red-600">{errors?.password}</p>
        )}
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
