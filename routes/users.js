// Bring Express
const express = require('express');
// Bring the Router from Express
const router = express.Router();
// Mongoose Module
const mongoose = require('mongoose');


// User Login Route
router.get('/login', (req, res)=>{
	res.send('Login');
});

// User Register Route
router.get('/register', (req, res)=>{
	res.send('Register');
});



// Export the Router to have access from other files
module.exports = router;