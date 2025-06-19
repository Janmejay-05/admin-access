const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const adminAuth = require("./middleware/adminAuth");
const proAuth = require("./middleware/proAuth");
const userModel = require("./models/userModel");
const adminRouts = require("./routes/adminRoutes");
const mainAdminAuth = require("./middleware/mainAdminAuth");
const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRouts);

app.get("/product", proAuth, (req, res) => {
  res.status(200).json({ message: "it is product data" });
});

app.get("/admin", adminAuth, async (req, res) => {
  try {
    const userData = await userModel.aggregate([
      { $match: { role: "user" } },
      { $project: { _id: 0, userName: 1, email: 1, role: 1 } },
    ]);

    res.status(200).json({ message: "it is admin data", userData });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.get("/mainadmin", mainAdminAuth, async (req, res) => {
  try {
    const userData = await userModel.aggregate([
      { $match: { role: { $ne: "main" } } },
      { $project: { _id: 0, userName: 1, email: 1, role: 1 } },
    ]);

    res.status(200).json({ message: "it is admin data", userData });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not running");
    return;
  }

  connection();
  console.log("server is  running");
});
