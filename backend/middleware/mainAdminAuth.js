const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mainAdminAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const datas = JSON.parse(req.headers.user);
  console.log("users", datas);
  if (!token) {
    return res.status(404).json({ message: "unauthorized" });
  }

  const result = jwt.verify(token.split(" ")[1], "jay");
  console.log("result", result);

  const { email, password, role } = result.result;

  console.log("email", email, datas.email);

  if (email !== datas.email) {
    return res.status(402).json({ message: "incorrect email" });
  }

  const reqPassword = datas.password;

  const response = await bcrypt.compare(reqPassword, password);

  if (!response) {
    return res.status(401).json({ message: "incorrect password" });
  }

  console.log("role", role);

  if (role === "main") {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = mainAdminAuth;
