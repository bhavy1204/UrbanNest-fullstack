const express = require("express");
const router = express.Router();

// Index 
router.get("/",(req,res)=>{
    console.log("Haa bhai  users route hai ye");
    res.send("Haa bhai ye le response of index");
});

// SHOW
router.get("/:id",(req,res)=>{
    console.log("Haa bhai users  route hai ye");
    res.send("Haa bhai ye le response of show");

});

// post
router.post("/",(req,res)=>{
    console.log("Haa bhai users  route hai ye");
    res.send("Haa bhai ye le response of Post");

});

// delete
router.delete("/",(req,res)=>{
    console.log("Haa bhai Users  route hai ye");
    res.send("Haa bhai ye le response of delete");

});

// Aur is file mese apan ne saari "useres" hata diye kyuki apan ne waha pe usko express ki route ki help se check kar lia tha ki jitni bhi /users se req aayegi usko is file ke saare route aur type jese ki post,delete se match karo aur uske hisab se res send karo...

// Is file me apan ne "/users" hata diye kyuki server.js me already app.use("/users", users) likha hai. Us line ka matlab ye hai ki jitni bhi "/users" se shuru hone wali requests hain, wo sab yahan is file ke routes se match karengi.
// Ab yahan sirf relative paths likhne hain jaise "/", "/:id", etc., aur Express automatically route match karega jaise GET /users, POST /users, etc.


module.exports = router;