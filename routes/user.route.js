const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/users", UserController.GetAllUsers);
router.post("/user", UserController.AddUser);

module.exports = router;
