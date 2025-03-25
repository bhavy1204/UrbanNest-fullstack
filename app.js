const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({extended:true}));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(()=>{
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.set("view engine","ejs");
app.engine('ejs', ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride ("_method"));

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
app.get("/listings",async (req,res)=>{
    let allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

// NEW LISTING ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// SHOW ALL ROUTE
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// CREATE ROUTE
app.post("/listings",async (req,res)=>{
    // let {title,description,image,price,location,country} = req.body;
    // let {listing} = req.body;
    // await Listing.insertOne(listing);
    // console.log("Data was inserted ");
    // res.redirect("/listings");
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
});


// Update route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// DELETE ROUTE 
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}); 

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.listen("3000",()=>{
    console.log("Port 3000 working");
});