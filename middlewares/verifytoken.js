const dotEnv = require("dotenv");
const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
dotEnv.config();

const secret = process.env.secretkey;
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const vendor = await Vendor.findById(decoded.vendorId);
    req.vendorId = vendor.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error verifying token" });
  }
};

module.exports = verifyToken;
