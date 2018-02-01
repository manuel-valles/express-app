// Bring Express Module
const express = require('express');
// Initialize the aplication
const app = express();


// Index Route - Get request
app.get('/', (req, res)=>{
	// Send method - send sth to the browser
	res.send('INDEX');
});

// About Route
app.get('/about', (req, res)=>{
	res.send('ABOUT');
})

// Port Varibale
const port = 5000;

// Listen in certain port and a callback funciton
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});