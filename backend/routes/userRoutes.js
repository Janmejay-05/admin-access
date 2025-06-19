const express = require("express");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//getting data
userRoutes.get("/all", async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({ users });
});

//register account
userRoutes.post(
  "/register",
  [
    body("userName").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      result.errors = result.errors.map((item) => {
        if (item.path == "userName") {
          item.msg = "enter your name";
          return item;
        }
        if (item.path == "email") {
          item.msg = "invalid email";
          return item;
        }
        if (item.path == "password") {
          item.msg = "invalid password";
          return item;
        }

        return item;
      });

      return res.status(400).json({ result });
    }

    try {
      const emailresult = await userModel.find({ email: req.body.email });
      console.log(emailresult);

      if (emailresult.length !== 0) {
        return res.status(400).json({ message: "email already exist" });
      }

      req.body.role = "user";

      req.body.password = await bcrypt.hash(req.body.password, 10);
      await userModel.insertOne(req.body);

      res.status(200).json({ message: "successful" });
    } catch (err) {
      res.status(401).json({ error: err });
    }
  }
);

//login
userRoutes.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      result.errors = result.errors.map((item) => {
        if (item.path == "email") {
          item.msg = "invalid email";
          return item;
        }
        if (item.path == "password") {
          item.msg = "invalid password";
          return item;
        }

        return item;
      });

      return res.status(400).json({ result });
    }

    const { email, password } = req.body;
    try {
      const result = await userModel.findOne({ email });

      if (!result) {
        return res.status(400).json({ invalid: "wrong email" });
      }

      if (await bcrypt.compare(password, result.password)) {
        const token = jwt.sign({ result }, "jay", { expiresIn: "2h" });

        res.status(200).json({
          message: "successful",
          token,
          role: result.role,
          data: { email, password },
        });
      } else {
        res.status(400).json({ invalid: "wrong password" });
      }
    } catch (err) {
      return res.status(400).json({ message: "error" });
    }
  }
);

module.exports = userRoutes;
