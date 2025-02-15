import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import User from "@/models/userModel";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { ErrorReporter } from "@/validator/errorReporter";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const findUser = await User.findOne({ email: output.email });

    if (findUser) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            email: "Email is already taken! Please try with another email.",
          },
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(output.password, salt);

    output.password = hashedPassword;
    await User.create(output);

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { success: false, errors: error.messages },
        { status: 400 }
      );
    }
    console.log("Server error", error);
    return NextResponse.json(
      {
        success: false,
        errors: { server: "Something went wrong. Please try again later." },
      },
      { status: 500 }
    );
  }
}
