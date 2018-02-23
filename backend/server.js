const port = process.env.PORT || 3001;
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('dev')); //log every request to the console
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


//serves static files
app.use(express.static(__dirname + "/public"));


// //CORS setup to allow other ports from this host
// if(!process.env.DYNO) {
// 	app.use( (req, res, next) => {
// 	  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
// 	  res.header("Access-Control-Allow-Credentials", "true");
// 	  res.header("Access-Control-Allow-Origin", "*");
// 	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
// 	  next();
// 	});
// }


//requiring router
const mainRoutes = require('./routes/main.js');
app.use(mainRoutes);

//----- handling errors when calling routes
app.use((err, req, res, next) => {
	if(err){
		// let message =  "something went wrong";
		res.send({ message : err.message});
	} else
	console.log(err.message);
	res.status(422).send(err);
});


//local server connection
app.listen(port, (err) => {
	if (!err)
	console.log(`Tea starting to brew locally on ${port}!!`);
	else console.log(`${port} is down... figure something out quick! The error is: ${err}`);
});
