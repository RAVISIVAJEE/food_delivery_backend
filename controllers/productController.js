const Product = require("../models/Product");
const Firm = require("../models/Firm");
const multer = require("multer");
const path = require("path");

const { response } = require("express");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 'uploads/' is the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // To prevent overwriting files, we generate a unique name
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ msg: "Firm not found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      description,
      image,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();

    return res
      .status(200)
      .json({ msg: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const firmId = req.params.Id;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ msg: "Firm not found" });
    }
    const products = await Product.find({ firm: firmId });

    res.status(200).json({ msg: "success", products: products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productid;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductById,
  deleteProductById,
};
