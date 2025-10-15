const express = require("express");

const {signUp, login, logout} = require("../controllers/authController.js");

const authRoute = express.Router();

authRoute.post("/signUp", signUp);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

module.exports = authRoute;