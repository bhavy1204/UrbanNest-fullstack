const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
// Cookies ko directly ese print ya access nhi kar sakte pehle unko parse karna hota hai cookie-parse package aur app.use middleware ko use karke!! 
const cookieParser = require("cookie-parser");

app.use(cookieParser("ThisIsASecretCode"));


// Signed cookie ka matlab ye nhi hota ki koi usko read nhi kar paaye apan usko  isliye use karte hai taaki apne ko pata chale ki kahi signed cookie ke saath kisi ne kkuch chedkani to nhi kari... Aur vo verify apan signed route pe try karte hai ! 
app.get("/signedcookie",(req,res)=>{
    res.cookie("made-in","Bharat",{signed:true});
    res.send("Signed cokkie bhejj di gayi hai !! ");
});

app.get("/verify",(req,res)=>{
    console.log(req.cookies); //Express signed aur nn-signed cookies ko alag alag divide kar deta hai aur req.cookies sirf unsigned cookies hi batati hai to ye line apni jo signed cookie thi usko nhi bategi. Uske liye ye niche wali line likhi padegi
    console.log(req.signedCookies);
    // Ab agar us signed cookie mese koi ek letter ki bhi chedkaani kar dega to vo unsigned ban jayegi aur pata pad jayega ki koi to BKL tha jisme harami pane kare the . 
    res.send("Verification page");
});

app.get("/helloBol",(req,res)=>{
    // We will make name:value pair in the applicatio in inspect directly 
    let {name="anjaan"} = req.cookies;
    res.send("Hello "+ name);
});

app.get("/cokkielelo",(req,res)=>{
    res.cookie("Color","red"); //name,value
    res.cookie("Color2","blue"); //name,value
    res.cookie("Color3","pink"); //name,value
    res.send("Cookie leni hai bhai matlab tereko ! ");
});

app.get('/', (req,res)=>{
    // console.log("Root is the name of me ! ");
    console.dir(req.cookies);
    res.send("Haa bhai ye le response of root");
});

app.use("/users", users); //users was a commoon keyword in all the users route so we asked the middleware to match all the routtes starting with "/users" in all the avaialbele path in user module which we required here and exported from users.js 
app.use ("/posts", posts);

app.listen(3000,()=>{
    console.log("Sever Working ");
})

// Tampering :Kisis chiz ke saath chedkani karna usko change kar dena 
// Signed cokkie : Cokkies which is verified or have some seal type of thing..? 
