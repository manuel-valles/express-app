// Bring Express Module
const express = require('express');
// Bring Handlebars Module
const exphbs  = require('express-handlebars');
// Mongoose Module
const mongoose = require('mongoose');

// Initialize the application
const app = express();

// Connect to mongoose
// Starting with just local DB
mongoose.connect('mongodb://localhost/express-dev')
.then(()=>{console.log('MongoDB Connected...')})
.catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
// Load the model into a variable with the name of the model
const Idea = mongoose.model('ideas');

// Handelbars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route - Get request
app.get('/', (req, res)=>{
	// Dynamic Data that will pass as a second parameter
	const title = 'Welcome to an Express App';
	// Send method - send sth to the browser
	res.render('index', {
		// title: title
		title
	});
});

// About Route
app.get('/about', (req, res)=>{
	res.render('about');
});

// Add Idea Form - Route
app.get('/ideas/add', (req, res)=>{
	res.render('ideas/add');
});

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});