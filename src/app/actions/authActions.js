"use server";
import { signIn, signOut } from "@/auth";

export async function socialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/sign-in" });
}
