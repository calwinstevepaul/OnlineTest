var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var question = new Schema({
    title:"string",
	description:"string", 
	html:"string",
	css:"string",
	js:"string",
	active:{type:'boolean',default:false},
	users_id:Array
  });

var Question = mongoose.model('question',question);
module.exports = Question;