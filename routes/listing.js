const express = require("express");
const router = express.Router();

// Other utility for the routes :- 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const { isloggedin } = require("../middleware.js");
const {isowner} = require("../middleware.js");

// controllers
const listingContoller = require("../controllers/listing.js");

// For multipart form data parsing
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); //multer will store files by deafult in "storage"

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
router.get("/", wrapAsync(listingContoller.index));

// NEW LISTING ROUTE
router.get("/new",  isloggedin, listingContoller.renderNewForm);

// SHOW ALL ROUTE
router.get("/:id", wrapAsync(listingContoller.showListing));

// CREATE ROUTE
router.post("/",upload.single('listing[image]'),(req,res)=>{
    // res.send(req.body);
    res.send(req.file); // in multer
});//("/", isloggedin,validateListing, wrapAsync(listingContoller.createListing));


// Update route
router.get("/:id/edit", isloggedin,isowner,wrapAsync(listingContoller.renderUpdateForm));

router.put("/:id", isloggedin,isowner,validateListing, wrapAsync(listingContoller.updateListing));

// DELETE ROUTE 
router.delete("/:id",isloggedin, isowner,wrapAsync(listingContoller.deleteListing));

module.exports = router;

