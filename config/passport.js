// Bring just Strategy from passport-local
const LocalStrategy = require('passport-local')
	.Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = mongoose.model('users');

// Function with our Stragety
module.exports = function(passport){
	// We need to specify email since email is used insted of username
	passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
		// Match User - Look for the user
		User.findOne({
			email: email
		}).then(user=>{
			if(!user){
				// function done passed above (error, user, message in object)
				return done(null, false, {message: 'No User Found'});
			}
			// Match password
			// Compare(password from Form, encrypted from DB, callback)
			bcrypt.compare(password, user.password, (err, isMatch)=>{
				if(err) throw err;
				if(isMatch){
					// done(no error, pass the user-true)
					return done(null, user);
				} else{
					return done(null, false, {message: 'Password Incorrect'});
				}
			});

		});
	}));
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
}