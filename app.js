// Bring Express Module
const express = require('express');
// Initialize the application
const app = express();


// How Middleware works
app.use((req, res, next)=>{
	// Log the TimeStamp every time we refresh the page
	console.log(Date.now());
	// Set a request variable that I can access through the application
	req.name = 'Manu';
	next();
});


// Index Route - Get request
app.get('/', (req, res)=>{
	console.log(req.name);
	// Send method - send sth to the browser
	res.send('INDEX');
});

// About Route
app.get('/about', (req, res)=>{
	res.send('ABOUT');
});

// Port Varibale
const port = 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});