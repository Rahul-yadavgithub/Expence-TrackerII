const User = require("../model/User.js");
const getToken = require("../configuration/token.js");
const bcrypt = require("bcryptjs");

// Helper: cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 8 * 24 * 60 * 60 * 1000, // 8 days
  path: "/", // ensure path matches for clearCookie
};

// Sign Up
const signUp = async (req, res) => {
  const { name, email, password, profileImageUrl } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, profileImageUrl });

    const token = await getToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ user }); // token in body not needed
  } catch (error) {
    return res.status(500).json({ message: `Signup Error: ${error.message}` });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await getToken(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: `Login Error: ${error.message}` });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error: ${error.message}` });
  }
};

module.exports = { signUp, login, logout };
