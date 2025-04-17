const express = require("express");
const router = express.Router();

// Other utility for the routes :- 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");

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
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// SHOW ALL ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

// CREATE ROUTE
router.post("/", validateListing, wrapAsync(async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let {listing} = req.body;
    // await Listing.insertOne(listing);
    // console.log("Data was inserted ");
    // res.redirect("/listings");
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
}));


// Update route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/${id}`);
}));

// DELETE ROUTE 
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;

