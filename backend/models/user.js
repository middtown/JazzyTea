// User model and schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT = 10;

const userSchema = mongoose.Schema({
  firstname: { type: String, maxlength: 30 },
  lastname: { type: String, maxlength: 30 },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 6, unique: true },
  token: { type: String }, });

//ES6 not used here because arrow functions change the scope of "this"
userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});

userSchema.methods.comparePassword = function (comparePassword, callback) {
  bcrypt.compare(comparePassword, this.password, function (err, Matches) {
      if (err) return callback(err);
      callback(null, Matches);
    });
};

userSchema.methods.genToken = function (callback) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  jwt.verify(token, config.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

userSchema.methods.deleteToken = function (token, callback) {
  var user = this;

  user.updte({ $unset: { token: 1 } }, (err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
