const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(()=>{
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"680460519e8efb4ab63bcc3d"})); //To initialize listings with the owner... Here we are doing that all listing have only one owner. 
    await Listing.insertMany(initData.data);
    console.log("Database was initialized");
};


initDB();
