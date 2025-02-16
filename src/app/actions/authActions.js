"use server";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";

export async function socialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/sign-in" });
}

export async function credentialsLoginAction(userDetails) {
  try {
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const validatedData = await validator.validate(userDetails);

    const res = await signIn("credentials", {
      redirect: false,
      email: validatedData.email,
      password: validatedData.password,
      callbackUrl: "/",
    });

    console.log("ress", res);
    return res;
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return { success: false, errors: error.messages };
    }
    console.log("Server error", error);
    return {
      success: false,
      errors: { server: "Something went wrong. Please try again later." },
    };
  }
}
