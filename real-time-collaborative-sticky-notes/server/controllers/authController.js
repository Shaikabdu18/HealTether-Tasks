const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "your-secret-key", { expiresIn: "1h" });
};

exports.register = async (req, res) => {
  const { username,password } = req.body;
  try {
    const user = await User.create({ username,password });
    res.status(201).json({ msg:"User created successfully"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
