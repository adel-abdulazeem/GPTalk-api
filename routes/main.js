const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");


//Routes for user Login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;


