import mongoose from "mongoose"

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
      enum: [
        "document-request",
        "career-support",
        "library-access",
        "gate-pass",
        "digital-card",
      ],
    },

    payload: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },

    adminRemarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("ServiceRequest", serviceRequestSchema)