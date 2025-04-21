const express = require("express");
const { route } = require("./listing");
const router = express.Router({ mergeParams: true }); //....? 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup", (req, res) => {
    // res.send("form WIll come soon ! ");
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerdUser = await User.register(newUser, password);
        // It will login the user just after signup.
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            // console.log(registerdUser);
            req.flash("success", "registerd Successfully !");
            res.redirect(req.session.redirectUrl);
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    } //we did try catch bcz wrapAsync was handling request but it was taking us to a different page altorgter but with help of try catch we can just flash a message for the error 
}));


router.get("/login", (req, res) => {
    res.render("users/login.ejs")
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    async (req, res) => {
        req.flash("success", "logged in successfully");
        // res.redirect(req.session.redirectUrl); //Isme ek problem hai ki jese hi user login hua aur success msg aaya to fir vo session ko reset kar deta hai.. To isse apne ko passport error dega isliye apan isko locals me store karate ha.
        // res.redirect(res.locals.redirectUrl);
        let redirectUrl = res.locals.redirectUrl || "/listings"; //This will prevent error when user tries to login in home page only.
        res.redirect(redirectUrl);
    }
);

// Logout.. It will delete user info from session making it logout.. With help of passport
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "logged out");
        res.redirect("/listings");
    })
});

module.exports = router;