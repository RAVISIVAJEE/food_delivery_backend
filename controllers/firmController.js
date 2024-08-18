const Firm = require("../models/Firm");
const Vendor = require("../models/vendor");
const multer = require("multer");

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
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({ msg: "firm added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const id = req.params.id;
    const firm = await Firm.findByIdAndDelete(id);
    if (!firm) {
      res.status(400).json({ msg: "unsuccessful" });
    }
    res.status(200).json({ msg: "successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addFirm: [upload.single("image"), addFirm],
  deleteFirmById,
};
