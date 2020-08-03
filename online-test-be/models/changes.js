var mongoose = require('mongoose');
var Schema = mongoose.Schema;



  const index = { html: 'text', css: 'text', js: 'text' };

  var changes = new Schema({
	  userId:{ type:Schema.Types.ObjectId,  ref:'users' },
	  questionId:String, 
	  html:String,
	  css:String,
	  js:String,
	  updated_at:{type:Date,default:new Date()},
		diff:[]
	});
  changes.index(index);

var Changes = mongoose.model('changes',changes);
module.exports = Changes;

