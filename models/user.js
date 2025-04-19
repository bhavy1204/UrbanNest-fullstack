const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongooose = require("passport-local-mongoose");

const userSchema = new Schema({
    email :{
        type :String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model("User", userSchema);

// DOCS :- 
// passport local mongoose apne aap saare hashing, username aur salting apne aap Schema me add kar deta hai. Chae apan usko field me emntion kare ya nhi kare 