// Bring Express Module
const express = require('express');
// Bring Handlebars Module
const exphbs  = require('express-handlebars');
// Body Parser Module
const bodyParser = require('body-parser');
// Method Override
const methodOverride = require('method-override');
// Flash Module
const flash = require('connect-flash');
// Session Module
const session = require('express-session')
// Mongoose Module
const mongoose = require('mongoose');


// Initialize the application
const app = express();

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Connect to mongoose
// Starting with just local DB
mongoose.connect('mongodb://localhost/express-dev')
.then(()=>{console.log('MongoDB Connected...')})
.catch(err => console.log(err));


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

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Flash Middleware
app.use(flash());

// Global variables
app.use((req, res, next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});
// About Route
app.get('/about', (req, res)=>{
	res.render('about');
});


// Use Routes
//(Route, File)
app.use('/ideas', ideas);
app.use('/users', users);

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});