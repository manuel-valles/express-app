// Bring Modules
const express = require('express');
// Path Module - No installation needed (Core JS Module)
const path = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const mongoose = require('mongoose');


// Initialize the application
const app = express();

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport); 

// DB COnfig
const db = require('./config/database');
// Connect to mongoose
// Starting with just local DB
mongoose.connect(db.mongoURI)
.then(()=>{console.log('MongoDB Connected...')})
.catch(err => console.log(err));

// Static folder - Middleware
// Make public folder the static folder
app.use(express.static(path.join(__dirname, 'public')));

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
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash Middleware
app.use(flash());

// Global variables
app.use((req, res, next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	// When you log in you have access to req.user - NULL if it's not there
	res.locals.user = req.user || null;
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
const port = process.env.PORT || 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});