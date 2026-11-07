import express from "express";
import RepairRequest from "../models/RepairRequest.js";
import { protect } from "../middleware/auth.js";
import { sendWhatsAppNotification } from "../utils/whatsapp.js";

const router = express.Router();

// POST /api/repairs (public) - customer submits a repair booking
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, deviceType, issue } = req.body;
    if (!name || !phone || !deviceType || !issue) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const request = await RepairRequest.create({ name, phone, deviceType, issue });
    
    // Trigger background WhatsApp message to the shop number
    sendWhatsAppNotification({ name, phone, deviceType, issue }).catch((err) => {
      console.error("[WhatsApp Notification] Background error:", err.message);
    });

    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
});

// GET /api/repairs (admin only) - inbox, optional ?status=
router.get("/", protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const requests = await RepairRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/repairs/:id (admin only) - update status/notes
router.patch("/:id", protect, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const request = await RepairRequest.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true, runValidators: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/repairs/:id (admin only)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const request = await RepairRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
