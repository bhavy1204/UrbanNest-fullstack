const express = require("express");
const { route } = require("./listing");
const router = express.Router({mergeParams:true}); //....? 

router.get("/signup",(req,res)=>{
    // res.send("form WIll come soon ! ");
    res.render("users/signup.ejs");
});

module.exports = router;