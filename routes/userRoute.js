const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const jwtauth = require("../middlewares/jwtauth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get-user", jwtauth, userController.findOneUser);
router.put("/edit-user", jwtauth, userController.editUser);
router.post("/count-user-by-jadwal", userController.numberOfUserByJadwal);
router.post("/atur-jadwal", jwtauth, userController.aturJadwal);
module.exports = router;
