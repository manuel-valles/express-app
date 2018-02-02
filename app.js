// Bring Express Module
const express = require('express');
// Bring Handlebars Module
const exphbs  = require('express-handlebars');
// Body Parser Module
const bodyParser = require('body-parser');
// Method Override
const methodOverride = require('method-override');
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

// Method Override Middleware
// override using a query value
app.use(methodOverride('_method'));

// About Route
app.get('/about', (req, res)=>{
	res.render('about');
});

// Idea Index Route
app.get('/ideas', (req, res)=>{
	Idea.find({})
		.sort({date: 'desc'})
		.then(ideas=>{
			res.render('ideas/index', {
				ideas: ideas
			});
		});
})

// Add Idea Form - Route
app.get('/ideas/add', (req, res)=>{
	res.render('ideas/add');
});

// Edit Idea Form - Route
app.get('/ideas/edit/:id', (req, res)=>{
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

// Edit Form Process
app.put('/ideas/:id', (req, res)=>{
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
				res.redirect('/ideas');
			});
	})
});

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});