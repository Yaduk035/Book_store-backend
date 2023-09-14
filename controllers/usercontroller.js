const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) return res.status(204).json({ Error: "No users found." });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Server Error." });
  }
};

const deleteUserError = async (req, res) => {
  try {
    res.status(400).json({ Message: "User Id Required." });
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ Message: "Invalid User Id." });
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();
    if (!user) res.status(204).json({ Error: "Users not found." });
    res.status(200).json({ Message: "User deleted succesfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "server error." });
  }
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ Message: "User Id required." });
  try {
    const user = await User.findById(req.params.id);
    if (!User) res.status(204).json({ Error: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Server Error" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  deleteUserError,
};
