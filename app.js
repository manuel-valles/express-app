// Bring Express Module
const express = require('express');
// Bring Handlebars Module
const exphbs  = require('express-handlebars');
// Body Parser Module
const bodyParser = require('body-parser');
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

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Process Form
app.post('/ideas', (req, res)=>{
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
				res.redirect('ideas');
			});
	}
});

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});