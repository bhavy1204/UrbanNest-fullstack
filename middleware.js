const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

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

module.exports.isowner=async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","you are not authorized");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner=async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","you are not authorized");
        return res.redirect(`/listings/${id}`);
    }
    next();
}