const User = require("../models/User");

const checkEmail = async (req, res) => {
  try {
    const emailId = req.params.email;
    const email = await User.findOne({ email: emailId });
    res.json({ exists: !!email });
  } catch (err) {
    res.status(500).json({ error: "server error." });
    console.error(err);
  }
};

module.exports = { checkEmail };
