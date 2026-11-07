import express from "express";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const adminEmail = process.env.ADMIN_EMAIL || "owner@deepcomputersolution.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: "static_owner_id",
    name: "Shop Owner",
    email: adminEmail,
    role: "owner",
    token: generateToken("static_owner_id"),
  });
});

// GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  res.json(req.admin);
});

export default router;
