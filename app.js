const express = require("express");
const mongoose = require('mongoose');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

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