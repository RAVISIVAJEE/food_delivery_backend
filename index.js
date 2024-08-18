const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./Routes/vendorRoutes");
const firmRoutes = require("./Routes/firmRoutes");
const productRoutes = require("./Routes/productRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
dotEnv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("successfully connected"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/products", productRoutes);
app.use("/uploads", express.static("uploads"));
const PORT = 4000;
app.listen(PORT, () => {
  console.log("server started");
});

app.use("/home", (req, res) => {
  res.send("<h1>this is homepage</h1>");
});
