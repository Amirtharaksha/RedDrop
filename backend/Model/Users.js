const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:String ,
    lastName:String , 
    email:String,
    password:String
})

const UserModel = mongoose.model("loginUsers" ,  UserSchema );
module.exports = UserModel;