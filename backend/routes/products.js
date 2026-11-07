import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// GET /api/products  (public) - supports ?category=&condition=&search=&minPrice=&maxPrice=
router.get("/", async (req, res, next) => {
  try {
    const { category, condition, search, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      const sanitized = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rgx = new RegExp(sanitized, "i");
      filter.$or = [{ name: rgx }, { description: rgx }, { specs: rgx }, { category: rgx }];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id (public)
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products (admin only) - up to 5 images
router.post("/", protect, upload.array("images", 5), async (req, res, next) => {
  try {
    const images = (req.files || []).map((f) => ({
      url: f.path,
      publicId: f.filename,
    }));
    const product = await Product.create({ ...req.body, images });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id (admin only)
router.put("/:id", protect, upload.array("images", 5), async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (req.files?.length) {
      update.images = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
    }
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id (admin only)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
