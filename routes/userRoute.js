const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const jwtauth = require("../middlewares/jwtauth");

router.post("/register", userController.registerUser);
// get all user
router.get("/users", userController.findAllUser);
router.post("/login", userController.loginUser);
// get one user
router.get("/:id", userController.findOneUser);

// delete user
router.delete("/:id", userController.deleteUser);

// edit user
router.put("/:id", userController.editUser);

module.exports = router;
