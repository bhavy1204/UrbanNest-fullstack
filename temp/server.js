const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");

app.get('/', (req,res)=>{
    console.log("Root is the name of me ! ");
    res.send("Haa bhai ye le response of root");
});

app.use("/users", users); //users was a commoon keyword in all the users route so we asked the middleware to match all the routtes starting with "/users" in all the avaialbele path in user module which we required here and exported from users.js 
app.use ("/posts", posts);

app.listen(3000,()=>{
    console.log("Sever Working ");
})