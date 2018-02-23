const mongoose = require('mongoose');



const User = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});



model.exports = mongoose.model('User', User);
