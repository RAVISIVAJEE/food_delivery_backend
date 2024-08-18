const express = require("express");

const ProductController = require("../controllers/productController");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct/:firmId", ProductController.addProduct);
router.get("/:Id/getProductById", productController.getProductById);
router.get("/uploads/:imageNmae", (req, res) => {
  const imageName = rew.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "/uploads", imageName));
});
router.delete("/:productid", ProductController.deleteProductById);

module.exports = router;
