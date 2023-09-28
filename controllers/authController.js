const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email | !pwd)
    return res.status(400).json({ Error: "email and password required." });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(404).json({ error: "error at founduser" });

  const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);
    const firstname = foundUser?.firstname;
    const userId = foundUser?._id;
    const lastname = foundUser?.lastname;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ roles, accessToken, firstname, lastname, userId });
  } else {
    res.status(401).json({ error: "Error" });
  }
};

module.exports = { handleLogin };
