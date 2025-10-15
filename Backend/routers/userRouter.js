const express = require("express");

const isAuth = require("../middleware/isAuth.js");

const getCurrentUser = require("../controllers/userController.js");

const userRoute = express.Router();

userRoute.get("/currentUser", isAuth, getCurrentUser);

module.exports = userRoute;

