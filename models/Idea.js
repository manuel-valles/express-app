const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	details:{
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// Create a Model (name, conected to our Schema) - Set up Schema 
mongoose.model('ideas', IdeaSchema);
