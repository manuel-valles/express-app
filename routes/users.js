// Bring Modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res)=>{
	res.render('users/login');
});

// User Register Route
router.get('/register', (req, res)=>{
	res.render('users/register');
});

// Login Form POST
router.post('/login', (req, res, next)=>{
	// Call passport instead our own custom functionality
	// Authenticate take name of the strategy
	passport.authenticate('local', {
		successRedirect: '/ideas',
		failureRedirect: '/users/login',
		// Show messages
		failureFlash: true
	// To automatically fire up:
	})(req, res, next);
});

// Register Form POST
router.post('/register', (req, res)=>{
	let errors = [];
	if(req.body.password != req.body.password2){
		errors.push({text: 'Passwords do not match'});
	}
	if(req.body.password.length < 4){
		errors.push({text: 'Password must be at least 4 characters'});
	}
	if(errors.length > 0){
		res.render('users/register', {
			errors: errors,
			// This is to avoid to reenter everything
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			password2: req.body.password2
		});
	} else{
		// Check if email has been used
		User.findOne({email: req.body.email})
			.then(user=>{
				if(user){
					req.flash('error_msg', 'Email already registered');
					res.redirect('/users/register');
				} else{
					// New User Object from our register form
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});
					// Create a salt
					// (number characters, callback)
					bcrypt.genSalt(10, (err, salt)=>{
						// Create a hash
						bcrypt.hash(newUser.password, salt, (err, hash)=>{
							if(err) throw err;
							// Set the password to the new hash
							newUser.password = hash;
							// Save the new user:
							newUser.save()
								.then(user=>{
									req.flash('success_msg', 'You are now registered');
									res.redirect('/users/login');
								})
								.catch(err=>{
									console.log(err);
									return;
								})
						});
					});
				}
		});
	}
});

// Logout User
router.get('/logout', (req, res)=>{
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
})

// Export the Router to have access from other files
module.exports = router;