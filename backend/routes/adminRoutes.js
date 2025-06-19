const express = require("express");
const userModel = require("../models/userModel");
const adminRouts = express.Router();

adminRouts.post("/userrole", async (req, res) => {
  try {
    console.log(req.body);

    const changedArr = req.body;

    changedArr.forEach(async (item) => {
      console.log(item.email);

      await userModel.updateOne(
        { email: item.email },
        { $set: { role: "admin" } }
      );
    });
    res.status(200).json({ message: "successfully role  changed" });
  } catch (err) {
    res.status(400).json({ message: "please make some changes" });
  }
});

adminRouts.post("/user-adminrole", async (req, res) => {
  try {
    console.log(req.body);

    const changedArr = req.body;

    changedArr.forEach(async (item) => {
      console.log(item.email);

      await userModel.updateOne(
        { email: item.email },
        { $set: { role: item.role } }
      );
    });
    res.status(200).json({ message: "successfully data changed" });
  } catch (err) {
    res.status(400).json({ message: "please make some changes" });
    console.log(err);
  }
});

module.exports = adminRouts;
