const express = require("express");

const isAuth = require("../middleware/isAuth.js");

const getDashboardData = require("../controllers/dashboardController.js");


const dashRouter = express.Router();

dashRouter.get("/",isAuth, getDashboardData);

module.exports = dashRouter;