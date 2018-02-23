const mongoose = require("mongoose");
/************
 * DATABASE *
 ************/
//connection to heroku and local comp.
mongoose.Promise = global.Promise; //spicify we are using default promises in mongoose
mongoose.connect( process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URI || "mongodb://localhost:27017/jazzytea");

let Tea = require ("./tea");
let User = require("./user");

module.exports = { Tea, User }
