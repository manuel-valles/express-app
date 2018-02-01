// Bring Express Module
const express = require('express');
// Bring Handlebars Module
const exphbs  = require('express-handlebars');

// Initialize the application
const app = express();



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

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});