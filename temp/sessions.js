const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require("express-session");


app.use(session({secret:"mysecretcode", resave:false,saveUninitialized:true}));

app.get("/reqcnt",(req,res)=>{
    if(req.session.count) req.session.count++;
    else req.session.count = 1;

    if(req.session.count>30){
        res.send("BSDK BHAG JA YAHA SE ITNI DER HO GAYI REFRESH KARTE KARTE ")
    }else{
        res.send(`Bhai tune ${req.session.count} , time ispe req bhej di hai ab to ruk ja...`);
    }
});

// app.get("/test",(req,res)=>{
//     res.send("Success test")
// });

app.listen(3000,()=>{
    console.log("Sever Working ");
})
