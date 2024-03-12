const User = require("../models/userProfile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const registerController = async (req, res) => {
  try {
    const { profilePicture, username, password, gender, dob, phone, country } =
      req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const doesUserExist = await User.findOne({ where: { username } });
    if (doesUserExist) {
      res.status(500).json({ error: "User does not exist" });
    }
    console.log(profilePicture);
    let lastLogin = new Date();
    const newUser = new User({
      profilePicture,
      username,
      password: hashedPassword,
      dob,
      phone,
      gender,
      country,
      lastLogin,
    });
    await newUser.save();
    console.log("User created successfully!");
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token, lastLogin, profilePicture, username });
  } catch (error) {
    console.log(`An error occured ${error}`);
    res.sendStatus(500);
  }
};

module.exports = registerController;
