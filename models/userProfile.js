const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize"); // Import the Sequelize instance

const User = sequelize.define(
  "Users",
  {
    profilePicture: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    country: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    duration: DataTypes.DATE,
  },
  {
    tableName: "Users",
  }
);

module.exports = User;
