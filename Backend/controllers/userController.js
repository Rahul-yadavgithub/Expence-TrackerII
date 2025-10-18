const User = require("../model/User.js");

const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password"); // ✅ use req.userId

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // changed 400 → 404
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current User Error: ${error.message}` });
  }
};


module.exports = getCurrentUser;