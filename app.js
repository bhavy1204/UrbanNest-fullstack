const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


app.use(express.urlencoded({ extended: true }));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(() => {
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/testing", async (req,res)=>{
//     let sampleData = new Listing({
//         title :"My shop",
//         description :"In main road bapubazar",
//         price:20000,
//         location:"Udaipur",
//         country:"India",
//     });
//     await sampleData.save().then(()=>{
//         console.log("Data saved");
//     });
//     res.send("Success");
// });


// INDEX ROUTE
app.get("/listings", wrapAsync(async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

// NEW LISTING ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// SHOW ALL ROUTE
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

// CREATE ROUTE
app.post("/listings", wrapAsync(async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let {listing} = req.body;
    // await Listing.insertOne(listing);
    // console.log("Data was inserted ");
    // res.redirect("/listings");
    if(!req.body.listing)
        throw new ExpressError(400,"Send valid data for listing");
    const { title, description, image, price, location, country } = req.body.listing;
    if(!description)
        throw new ExpressError(400,"Description is missing");
    if(!price)
        throw new ExpressError(400,"Price is missing");
    if(!location)
        throw new ExpressError(400,"Location is missing");
    if(!country)
        throw new ExpressError(400,"Country is missing");
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
}));


// Update route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    res.render("listings/edit.ejs", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE 
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

app.get("/", (req, res) => {
    res.send("Home route");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err, req, res, next) => {
    let {status=500,message="SOmething Went Wrong " }= err;
    // res.send("SOmethhing Went Wrong :( ");
    // res.status(status).send(message);
    res.render("error.ejs",{err});
});

app.listen("3000", () => {
    console.log("Port 3000 working");
});