const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewForm = (req, res) => {
    // console.log(req.user); // jo request hoti hai usme user related information saved hoti hai. 
    // //We want to check if the user is logged in before creatinh new listing so 
    // if(!req.isAuthenticated()){
    //     req.flash("error","Please log in to create listing");
    //     return res.redirect("/login");
    // }
    //Now we want this same logic at time of updation deletion etc... So we will create a middleware for it.
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author",},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested was not found");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let {listing} = req.body;
    // await Listing.insertOne(listing);
    // console.log("Data was inserted ");
    // res.redirect("/listings");
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; //To create a listing with the logged in user id.
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","Listing Added Successfully");
    res.redirect("/listings");
}

module.exports.renderUpdateForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let orginialUrl = listing.image.url;
    orginialUrl.replace("/upload","/upload/h_300,w_250"); //Making iamge blur for faster and effiect working.
    res.render("listings/edit.ejs", { listing , orginialUrl});
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing updated Successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    console.log(deletedListing);
    res.redirect("/listings");
}