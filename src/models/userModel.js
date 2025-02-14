import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    require: [true, "Name is required."],
    type: String,
    trim: true,
  },
  email: {
    require: [true, "Email is required."],
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
