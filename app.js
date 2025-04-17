const express = require("express");
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.use(express.urlencoded({ extended: true }));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/UrbanNest');
}
main().then(() => {
    console.log("MongoDB connnected");
}).catch((err) => {
    console.log(err);
});

app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions={
    secret:"secretcode",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires: Date.now() +(7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));

app.use("/listings", listings);
app.use("/listings/:id/review/", reviews);

app.get("/", (req, res) => {
    res.send("Home route");
});


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "SOmething Went Wrong " } = err;
    res.render("error.ejs", { err });
});

app.listen("3000", () => {
    console.log("Port 3000 working");
});

// COOKIES / WEB COKKIES / HTTP COOKIES 
// cookies are tiny block/chunk of data stored in browser. bascially if we do any personalization or anything temperorialy than browser needs to remember it.. Like if we choose dark theme than everyy page shoud be in dark theme, We added few prod in cart aandd than went to next page but browser still needs to remeber that we added those products before, Like if we login in one page of a social mmeddia app than we will be logged in all pages which is authentication process took lace with help of cookies
// Cookies are stored in name value pair. We can see them in => Inspect -> application -> Storage