const express = require("express");
const { route } = require("./listing");
const router = express.Router({mergeParams:true}); //....? 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup",(req,res)=>{
    // res.send("form WIll come soon ! ");
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req,res)=>{
    try{ 
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerdUser = await User.register(newUser,password);
        console.log(registerdUser);
        req.flash("success","registerd Successfully !");
        res.redirect("/listings");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    } //we did try catch bcz wrapAsync was handling request but it was taking us to a different page altorgter but with help of try catch we can just flash a message for the error 
}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})

module.exports = router;