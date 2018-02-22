const querystring = require('querystring');
const express = require("express");
const router = express.Router();
const mainController = require('../controllers/generals');


//home route
router.get('/api', mainController.home);
//user route
router.get('/api/creator', mainController.creator);

module.exports = router;
