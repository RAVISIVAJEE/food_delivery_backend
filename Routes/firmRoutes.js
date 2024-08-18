const express = require("express");

const firmController = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifytoken");

const router = express.Router();

// Create a new firm

router.post("/add-firm", verifyToken, firmController.addFirm);

router.get("/uploads/:imageNmae", (req, res) => {
  const imageName = rew.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "/uploads", imageName));
});

router.delete("/:id", firmController.deleteFirmById);
module.exports = router;
