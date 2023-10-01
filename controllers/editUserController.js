const User = require("../models/User");

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ Message: "User Id required." });
  try {
    const user = await User.findById(req.params.id);
    if (!User) res.status(400).json({ Error: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Server Error" });
  }
};

const editUser = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ error: "No id sent" });
  const { firstname, lastname, password, email } = req.body;
  const userData = {
    firstname,
    lastname,
    password,
    email,
    updatedAt: Date.now(),
  };
  try {
    const user = await User.findByIdAndUpdate(req.params.id, userData, {
      new: true,
    }).exec();
    if (!user) return res.status(400).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, editUser };
