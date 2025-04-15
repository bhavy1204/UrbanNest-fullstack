const express = require("express");
const router = express.Router();

// Index p
router.get("/",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of index of post");
});

// SHOW p
router.get("/:id",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of show of post");

});

// post p
router.post("/",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of Post of post");

});

// delete p
router.delete("/:id",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of delete of post");

});

module.exports = router;