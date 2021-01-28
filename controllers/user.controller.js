const UserService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenService = require("../services/token.service");

const GetOrganizationsByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const organizations = await UserService.FindOneAndPopulate(
      { _id: user_id },
      "organizations"
    );
    return res.status(200).json({
      message: "OK",
      data: organizations,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

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

const GetUsersByType = async (req, res) => {
  try {
    const { user_type } = req.params;

    const users = await UserService.Find({
      userType: user_type,
    });

    return res.status(200).json({
      message: "OK",
      data: users,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const GetUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await UserService.FindOne({
      _id: user_id,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "OK",
      data: user,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const Register = async (req, res) => {
  try {
    const {
      userType,
      username,
      name,
      email,
      password,
      language,
      country,
      organizations,
    } = req.body;

    const existing_user = await UserService.FindOne({
      email,
    });

    if (existing_user) {
      return res.status(409).json({
        message: "Data exists already",
      });
    }

    await UserService.Create({
      userType,
      username,
      name,
      email,
      password,
      language,
      country,
      organizations,
    });

    return res.status(200).json({
      message: "Data inserted.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      userType,
      username,
      name,
      email,
      password,
      language,
      country,
      organizations,
    } = req.body;

    const user = await UserService.FindOne({
      _id: user_id,
    });

    if (!user) {
      return res.status(404).json({
        message: "Data not found.",
      });
    }

    const updatedData = await UserService.FindOneAndUpdate(
      { _id: user_id },
      {
        userType,
        username,
        name,
        email,
        password,
        language,
        country,
        organizations,
      }
    );

    return res.status(200).json({
      message: "Data updated.",
      data: updatedData,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const DeletUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await UserService.DeleteOne({ _id: user_id });
    return res.status(200).json({
      message: "Data deleted.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = res.body;
    const user = await UserService.FindOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email/password",
      });
    }

    const valid =
      user.password && (await bcrypt.compare(password, user.password));

    if (!valid) {
      return res.status(400).json({
        message: "Invalid email/password",
      });
    }

    const access_token = jwt.sign(user.toJSON(), "mysecretkey", {
      expiresIn: "24h",
    });

    await TokenService.Create({ access_token });

    return res.status(200).json({
      message: "User authenticated",
      access_token,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const Logout = async (req, res) => {
  try {
    const authorization =
      req.headers["x-access-token"] || req.headers.authorization;
    const token =
      authorization &&
      authorization.startsWith("Bearer") &&
      authorization.slice(7, authorization.length);
    await TokenService.DeleteOne({ access_token: token });
    return res.status(200).json({
      message: "User logged out.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  GetOrganizationsByUser,
  GetAllUsers,
  GetUsersByType,
  GetUserById,
  Register,
  UpdateUser,
  DeletUser,
  Login,
  Logout,
};
