var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminUsers = new Schema({
    name:String,
    email:{type:String,index:{unique:true}},
    organization:String,
    password:String,
    last_update:{type:Date,default:new Date()},
    isAdmin:{type:Boolean,default:true},
    profilePicture:String

  });

var AdminUsers = mongoose.model('adminUsers',adminUsers);
module.exports = AdminUsers;