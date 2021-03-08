const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const jwtauth = require("../middlewares/jwtauth");
const jwtauthAdmin = require("../middlewares/jwtauth-admin");

router.post("/register", userController.registerUser);
// get all user
// router.get("/users", jwtauthAdmin, userController.findAllUser);
router.post("/login", userController.loginUser);
// get one user
router.get("/get-user", jwtauth, userController.findOneUser);
// delete user
// router.delete("/delete-user/:id", jwtauthAdmin, userController.deleteUser);

// edit user
router.put("/edit-user", jwtauth, userController.editUser);

module.exports = router;
