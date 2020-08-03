var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const index = { name: 'text', email: 'text', organization: 'text' };

var users = new Schema({
    name:String,
    email:{type:String,index:{unique:true}},
    organization:String,
    password:String,
    last_update:{type:Date,default:new Date()},
    isOnline:{type:Boolean,default:false}
  });

  users.index(index);

var Users = mongoose.model('users',users);
module.exports = Users; 