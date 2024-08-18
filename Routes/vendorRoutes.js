const vendorController = require("../controllers/vendorcontroller");

const express = require("express");
const router = express.Router();

//create vendor
router.post("/register", vendorController.vendorRegister);
router.post("/Login", vendorController.vendorLogin);
router.get("/all-vendor", vendorController.getAllVendor);
router.get("/single-vendor/:id", vendorController.getVendorById);
module.exports = router;
