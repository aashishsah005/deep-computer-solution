import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Accessories",
        "Laptop",
        "Desktop PC",
        "Motherboard",
        "Monitor",
        "Printer",
        "Networking",
        "Other",
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Refurbished"],
      default: "New",
    },
    price: { type: Number, required: true, min: 0 },
    stock: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited"],
      default: "In Stock",
    },
    description: { type: String, trim: true },
    specs: { type: String, trim: true }, // free text, e.g. "i5 10th Gen / 8GB / 512GB SSD"
    images: [{ url: String, publicId: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", specs: "text" });

export default mongoose.model("Product", productSchema);
