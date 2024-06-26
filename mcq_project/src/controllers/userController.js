const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ id: foundUser._id }, "jwtSecret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
