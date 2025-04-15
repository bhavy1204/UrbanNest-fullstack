const express = require("express");
const app = express();

app.get('/', (req,res)=>{
    console.log("Root is the name of me ! ");
    res.send("Haa bhai ye le response of root");

});

// Index 
app.get("/users",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of index");
});

// SHOW
app.get("/users/:id",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of show");

});

// post
app.post("/users",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of Post");

});

// delete
app.delete("/users",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of delete");

});


// Index p
app.get("/posts",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of index of post");
});

// SHOW p
app.get("/posts/:id",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of show of post");

});

// post p
app.post("/posts",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of Post of post");

});

// delete p
app.delete("/posts/:id",(req,res)=>{
    console.log("Haa bhai users route hai ye");
    res.send("Haa bhai ye le response of delete of post");

});


app.listen(3000,()=>{
    console.log("Sever Working ");
})