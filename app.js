const express = require("express");
const mongoose = require('mongoose');

const app = express();

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(()=>{
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.listen("3000",()=>{
    console.log("Port 3000 working");
});