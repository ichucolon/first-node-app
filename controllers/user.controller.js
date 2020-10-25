const User = require("../models/user.model");
const UserService = require("../services/user.service");

const GetAllUsers = async (req, res) => {
  try {
    const users = await UserService.Find();
    return res.status(200).json({
      message: "OK",
      data: users,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const AddUser = async (req, res) => {
  try {
    const {
      userType,
      username,
      name,
      email,
      password,
      language,
      country,
    } = req.body;

    const existing_organization = await OrganizationService.FindOne({
      name,
    });

    if (existing_user) {
      return res.status(409).json({
        message: "Data exists already",
      });
    }

    await OrganizationService.Create({
      userType,
      username,
      name,
      email,
      password,
      language,
      country,
    });

    return res.status(200).json({
      message: "Data inserted.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  GetAllUsers,
  AddUser,
};
