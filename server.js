require ('dotenv/config');
const express = require ('express');
const wakeUpDyno = require('./wokeDyno'); // my module!
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const form = require('./src/Helpers/form')
/*=============================================*/
const cors = require('cors');
/*=============================================*/
const Router = require ('./src/Routers/index');

const server = express ();
const port = process.env.PORT || 5000;
const DYNO_URL = "https://green-store-pos.herokuapp.com";
const nodeEnv = 'Development';

server.listen (port, () => {
  console.log (`Server is running in port ${port} in ${nodeEnv} Mode`);
  wakeUpDyno(DYNO_URL); // will start once server starts
});

// server.listen (port, '0.0.0.0');
  

server.use (logger('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));

/*=============================================*/
//adjusting the response (no response is sent)
//https://www.youtube.com/watch?v=zoSJ3bNGPp0

// server.use ((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*'); //for any origin
// 	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //which header is allowed
// 	if (req.methode === 'OPTIONS'){
// 		//ONLY SEND AN OPTIONS REQUEST FIRST
// 		res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
// 		return form.success(res, 200, response);
// 	}
// 	next(); //add this at the end of ur middleware
// 	//if we're not immediately returning 
// })



const configurationOptions = {
	methods: ['GET', 'PUT', 'POST', 'DELETE'],  //method that allowed
	// origin:  'localhost:5000' 
	origin:  '*' // for all access 
}

server.use (cors(configurationOptions))
server.use (cors()) //default all of them included

/*=============================================*/

server.use ('/', Router);

module.exports = server;
