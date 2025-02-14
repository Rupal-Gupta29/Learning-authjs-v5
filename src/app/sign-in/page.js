"use client";
import SignInForm from "@/components/SignInForm";
import SocialLoginForm from "@/components/SocialLoginForm";

const page = () => {
  return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl p-6 sm:p-12">
        <h3 className="text-gray-800 text-xl font-bold text-center mb-6">
          Sign In
        </h3>
        <div>
          <SignInForm />
        </div>
        <div>
          <SocialLoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
