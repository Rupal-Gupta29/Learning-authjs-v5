"use client";
import { logoutAction } from "@/app/actions/authActions";

const LogoutBtn = () => {
  return <button onClick={() => logoutAction()} className="bg-transparent hover:bg-gray-100 text-gray-500 text-sm font-bold py-2 px-4 border border-gray-400 rounded">Logout</button>;
};

export default LogoutBtn;
