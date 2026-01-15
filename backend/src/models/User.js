import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    password: String,

    provider: {
      type: String,
      enum: ["local", "google", "linkedin"],
      default: "local",
    },
    providerId: String,

    role: {
      type: String,
      enum: ["alumni", "admin"],
      default: "alumni",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)