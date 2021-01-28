const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/users", UserController.GetAllUsers);
router.get("/users/:user_type", UserController.GetUsersByType);
router.get("/user/:user_id", UserController.GetUserById);
router.get(
  "/user/:user_id/organizations",
  UserController.GetOrganizationsByUser
);
router.post("/user", UserController.Register);
router.put("/user/:user_id", UserController.UpdateUser);
router.delete("/user/:user_id", UserController.DeletUser);

module.exports = router;
