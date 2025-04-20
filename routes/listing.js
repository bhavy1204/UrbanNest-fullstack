const express = require("express");
const router = express.Router();

// Other utility for the routes :- 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const { isloggedin } = require("../middleware.js");

// SERVER SIDE VALIDATION FOR LISTINGS
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }
    else
        next();
}

// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

// NEW LISTING ROUTE
router.get("/new",  isloggedin, (req, res) => {
    // console.log(req.user); // jo request hoti hai usme user related information saved hoti hai. 
    // //We want to check if the user is logged in before creatinh new listing so 
    // if(!req.isAuthenticated()){
    //     req.flash("error","Please log in to create listing");
    //     return res.redirect("/login");
    // }
    //Now we want this same logic at time of updation deletion etc... So we will create a middleware for it.
    res.render("listings/new.ejs");
});

// SHOW ALL ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested was not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

// CREATE ROUTE
router.post("/", isloggedin,validateListing, wrapAsync(async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let {listing} = req.body;
    // await Listing.insertOne(listing);
    // console.log("Data was inserted ");
    // res.redirect("/listings");
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","Listing Added Successfully");
    console.log(newListing);
    res.redirect("/listings");
}));


// Update route
router.get("/:id/edit", isloggedin,wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

router.put("/:id", isloggedin,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing updated Successfully");
    res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE 
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;

