import mongoose from "mongoose";

const repairRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    deviceType: {
      type: String,
      required: true,
      enum: ["Laptop", "Desktop PC", "Printer", "Other"],
    },
    issue: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    notes: { type: String, trim: true }, // internal admin notes
  },
  { timestamps: true }
);

export default mongoose.model("RepairRequest", repairRequestSchema);
