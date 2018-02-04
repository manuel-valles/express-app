// Import Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Bring just the function from auth.js
const {ensureAuthenticated} = require('../helpers/auth');


// Load Idea Model
require('../models/Idea');
// Load the model into a variable with the name of the model
const Idea = mongoose.model('ideas');

// Since we moved Routes to here we changed app to router
// I.e. app.get to router.get
// Idea Index Route
router.get('/', ensureAuthenticated, (req, res)=>{
	Idea.find({})
		.sort({date: 'desc'})
		.then(ideas=>{
			res.render('ideas/index', {
				ideas: ideas
			});
		});
})

// Add Idea Form - Route
router.get('/add', ensureAuthenticated, (req, res)=>{
	res.render('ideas/add');
});

// Edit Idea Form - Route
router.get('/edit/:id', ensureAuthenticated, (req, res)=>{
	Idea.findOne({
		_id: req.params.id
	})
	.then(idea=>{
		res.render('ideas/edit', {
			idea: idea
		});
	});
	
});

// Process Form
router.post('/', ensureAuthenticated, (req, res)=>{
	// Validation
	let errors = [];

	if(!req.body.title){
		errors.push({text: 'Please add a title'});
	}
	if(!req.body.details){
		errors.push({text: 'Please add some details'});
	}

	if(errors.length>0){
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else{
		const newUser = {
			title: req.body.title,
			details: req.body.details
		}
		new Idea(newUser)
			.save()
			.then(idea=>{
				req.flash('success_msg', 'Video idea added');
				res.redirect('ideas');
			});
	}
});

// Edit Idea Form Process
router.put('/:id', ensureAuthenticated, (req, res)=>{
	Idea.findOne({
		_id: req.params.id
	})
	.then(idea=>{
		// new values
		idea.title = req.body.title;
		idea.details = req.body.details;
		// save these new values
		idea.save()
			.then(idea=>{
				req.flash('success_msg', 'Video idea updated');
				res.redirect('/ideas');
			});
	})
});

// Delete Idea 
router.delete('/:id', ensureAuthenticated, (req, res)=>{
	Idea.remove({_id: req.params.id})
		.then(()=>{
			// Add message
			req.flash('success_msg', 'Video idea removed');
			res.redirect('/ideas');
		});
});


// Export the Router to have access from other files
module.exports = router;