const mongoose = require('mongoose');

const UserDetails = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    contact:{
        type: Number
    },
    address:{
        type: String
    }
})

module.exports = new mongoose.model("UserDetails1", UserDetails);