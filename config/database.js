if(process.env.NODE_ENV == 'production'){
	module.exports = {
		mongoURI: 'You should put your mongoURI for deployment here'
	}
} else{
	module.exports = {mongoURI: 'mongodb://localhost/express-dev'}
}