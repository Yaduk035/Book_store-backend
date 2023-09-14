const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user | !pwd)
    return res.status(400).json({ Error: "username and password required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(404).json({ error: "error at founduser" });

  const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
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

    res.json({ roles, accessToken });
  } else {
    res.status(401).json({ error: "Error" });
  }
};

module.exports = { handleLogin };
