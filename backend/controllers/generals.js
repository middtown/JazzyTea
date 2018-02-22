const express = require("express");
const router = express.Router();


//home route
const home = (req, res) => {
  res.send (`<h1> Backend Home Route </h1>`);
};

//user route
const creator = (req, res) => {
  res.json([
    { id: 1, creatorName: 'Middtown' }, { id: 2, creatorName: 'Aaron' }
  ])
}

module.exports = { home, creator };
