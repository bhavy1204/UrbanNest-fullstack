module.exports.isloggedin=  (req,res,next)=>{
    // console.log(req.user); // jo request hoti hai usme user related information saved hoti hai. 
    //We want to check if the user is logged in before creatinh new listing so 
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Please log in to create listing");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}