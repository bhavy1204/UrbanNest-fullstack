const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({extended:true}));
const Listing = require("./models/listing.js");

const path = require("path");


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(()=>{
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

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
    let {listing} = req.body;
    await Listing.insertOne(listing);
    console.log("Data was inserted ");
    res.redirect("/listings");
});

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.listen("3000",()=>{
    console.log("Port 3000 working");
});