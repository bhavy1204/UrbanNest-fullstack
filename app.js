const express = require("express");
const mongoose = require('mongoose');

const app = express();
const Listing = require("./models/listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(()=>{
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.get("/testing", async (req,res)=>{
    let sampleData = new Listing({
        title :"My shop",
        description :"In main road bapubazar",
        price:20000,
        location:"Udaipur",
        country:"India",
    });
    await sampleData.save().then(()=>{
        console.log("Data saved");
    });
    res.send("Success");
});

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.listen("3000",()=>{
    console.log("Port 3000 working");
});