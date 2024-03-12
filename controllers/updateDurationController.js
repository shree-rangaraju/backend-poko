const User = require("../models/userProfile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const updateDurationController = async (req, res) => {
  const fetchUserDetails = await User.findOne({ where: { username } });
  try {
    const { leaveTime } = req.body;
    if (leaveTime != null) {
      const { username, lastLogin } = req.user;
      const duration = leaveTime - lastLogin;
      fetchUserDetails.duration = new Date(duration);
      fetchUserDetails.save();
      const token = jwt.sign(
        {
          username,
        },
        SECRET_KEY
      );
      res.status(200).json({
        token,
        lastLogin: leaveTime,
        profilePicture: fetchUserDetails.profilePicture,
        username,
      });
    } else {
      res.status(200).send(fetchUserDetails.duration);
    }
  } catch (e) {
    console.log(`An error occured ${e}`);
    res.sendStatus(500);
  }
};

module.exports = updateDurationController;
