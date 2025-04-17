const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require("express-session");

const flash = require("connect-flash");

const  path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret:"mysecretcode", 
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/reqcnt",(req,res)=>{
    if(req.session.count) req.session.count++;
    else req.session.count = 1;

    if(req.session.count>30){
        res.send("BSDK BHAG JA YAHA SE ITNI DER HO GAYI REFRESH KARTE KARTE ")
    }else{
        res.send(`Bhai tune ${req.session.count} , time ispe req bhej di hai ab to ruk ja...`);
    }
});

app.use((req,res,next)=>{
    res.locals.success = req.flash("done"); 
    res.locals.failure = req.flash("error"); 
    next();
})

app.get("/register",(req,res)=>{
    let {name = "meowChand"} = req.query;
    console.log(req.session);
    req.session.name = name;
    //Now this will bcreate a flash but we wont able to see it yet we have to use "views" in order to see it 
    // req.flash("done","Registration completed");//key,msg 

    if(name==="meowChand"){
        req.flash("error","Registration to karle bhadve");
    }else{
        req.flash("done","Registration completed");

    }

    res.redirect("/whatismyname");
}) //First this will store the name in the session or meowChand as deafult and than we can use that "session.name" anywhere in any route. But first we have to go on registe route otherwise it wont come it will come undefined.

app.get("/whatismyname",(req,res)=>{
    // Another way of implemtning is throught req.locals.variables
    // res.render("page.ejs",{name : req.session.name, msg : req.flash("done") });
    // Another way:- 
    // res.locals.success = req.flash("done"); 
    // res.locals.failure = req.flash("error"); 
    //Is tarike ko use karne ka main motive yahi hai ki apan itne saare msg bana sakte hai aur inko paas nhi karna pdega ek ek karke apne directly kar sakte hai kind of..?
    // Par isse bhi acha ye hoga ki inko middleware me daal ke taaki ye sab jagah kaam aa sake aur individual function jyda bulky na ho.
    res.render("page.ejs",{name : req.session.name}); 
});

// app.get("/test",(req,res)=>{
//     res.send("Success test")
// });

app.listen(3000,()=>{
    console.log("Sever Working ");
})

//Connect flash is amiddleware use to make and flash one time messages once the page is refereshed the message is gone with no track in memory or express.
