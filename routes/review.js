const express = require("express");
const router = express.Router( {mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const {isloggedin,isReviewOwner} = require("../middleware.js");
// controller
const reviewContoller = require("../controllers/review.js");

// SERVER SIDE VALIDATION FOR REVIEWS
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }
    else
        next();
}

// REVIEW ROUTE
router.post("/",isloggedin,validateReview, wrapAsync(reviewContoller.createReview));

// DELETE ROUTE FOR REVIEW 
router.delete("/:reviewId",isloggedin,isReviewOwner, wrapAsync(reviewContoller.deleteReview));

module.exports = router;