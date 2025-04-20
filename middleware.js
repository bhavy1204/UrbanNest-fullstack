module.exports.isloggedin=  (req,res,next)=>{
    // console.log(req.user); // jo request hoti hai usme user related information saved hoti hai. 
    //We want to check if the user is logged in before creatinh new listing so 
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to create listing");
        return res.redirect("/login");
    }
    next();
}