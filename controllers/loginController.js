const User = require("../models/userProfile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordEqual) {
        console.log("User logged in successfully!");
        const token = jwt.sign(
          {
            username,
          },
          SECRET_KEY
        );
        res.status(200).json({
          token,
          lastLogin: existingUser.lastLogin,
          profilePicture: existingUser.profilePicture,
          username,
        });
      } else {
        res.status(500).json({ error: "Wrong username or password" });
      }
    } else {
      res.status(500).json({ error: "User does not exist" });
    }
  } catch (e) {
    console.log(`An error occured ${e}`);
    res.sendStatus(500);
  }
};

module.exports = loginController;
