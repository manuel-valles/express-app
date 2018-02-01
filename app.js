// Bring Express Module
const express = require('express');
// Initialize the aplication
const app = express();
// Port Varibale
const port = 5000;

// Listen in certain port and a callback funciton
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});