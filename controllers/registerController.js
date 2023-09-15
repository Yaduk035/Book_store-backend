const User = require("../models/User");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  const { firstname, lastname, email, pwd } = req.body;
  if (!firstname || !lastname || !pwd || !email)
    return res.status(400).json({
      message:
        "Username, firstname, lastname, password and email are required.",
    });

  // const duplicateUsername = await User.findOne({ username: user }).exec();
  // if (duplicateUsername)
  //   return res.status(409).json({ Error: "Username already exists." });

  const duplicateEmail = await User.findOne({ email: email }).exec();
  if (duplicateEmail)
    return res.status(409).json({ Error: "Email already exists." });

  try {
    hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = newUser;

// {"user":"username","firstname": "","lastname":"","email":"","pwd": ""}
