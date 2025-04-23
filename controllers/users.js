const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    // res.send("form WIll come soon ! ");
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
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
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success", "logged in successfully");
    // res.redirect(req.session.redirectUrl); //Isme ek problem hai ki jese hi user login hua aur success msg aaya to fir vo session ko reset kar deta hai.. To isse apne ko passport error dega isliye apan isko locals me store karate ha.
    // res.redirect(res.locals.redirectUrl);
    let redirectUrl = res.locals.redirectUrl || "/listings"; //This will prevent error when user tries to login in home page only.
    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "logged out");
        res.redirect("/listings");
    })
}