const express = require("express");
const { route } = require("./listing");
const router = express.Router({ mergeParams: true }); //....? 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

// Controllers
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm );

router.post("/signup", wrapAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login", saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    userController.login
);

// Logout.. It will delete user info from session making it logout.. With help of passport
router.get("/logout",userController.logout);

module.exports = router;