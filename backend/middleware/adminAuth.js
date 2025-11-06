import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not authorized. Please log in again." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }

    // Attach email from token payload OR fallback to .env admin email
    req.adminEmail = decoded.email || process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(500).json({ message: `adminAuth error: ${error.message}` });
  }
};

export default adminAuth;
