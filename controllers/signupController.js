const User = require("../models/User");

// const checkUsername = async (req, res) => {
//   try {
//     const username = req.params.username;
//     const user = await User.findOne({ username: username });
//     res.json({ exists: !!user });
//   } catch (err) {
//     res.sendStatus(500);
//     console.error(err);
//   }
// };

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
