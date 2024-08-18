const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const key = process.env.secretkey;
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const vendorEmail = await Vendor.findOne({ email });

    if (vendorEmail) {
      return res.status(400).json({ msg: "Email already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();

    res
      .status(201)
      .json({ msg: "Vendor saved successfully", vendor: newVendor });
    console.log("Vendor saved successfully");
  } catch (error) {
    res.status(500).json({ msg: "Error saving vendor", error });
    console.log(error);
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  const details = await Vendor.findOne({ email });

  if (!details) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, details.password);
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid password" });
  }

  const token = jwt.sign({ vendorId: details._id }, key, { expiresIn: "1h" });
  res.status(200).json({ msg: "Log in sucessful", token });
};

const getAllVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.status(200).json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { vendorRegister, vendorLogin, getAllVendor, getVendorById };
