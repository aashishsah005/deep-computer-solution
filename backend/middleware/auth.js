import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id === "static_owner_id") {
      req.admin = {
        _id: "static_owner_id",
        name: "Shop Owner",
        email: process.env.ADMIN_EMAIL || "owner@deepcomputersolution.com",
        role: "owner",
      };
      return next();
    }
    return res.status(401).json({ message: "Not authorized" });
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const requireOwner = (req, res, next) => {
  if (req.admin?.role !== "owner") {
    return res.status(403).json({ message: "Owner access only" });
  }
  next();
};
