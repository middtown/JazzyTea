const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//database connection from config file - dev and production variables
const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

//importing user models
const { User } = require('./models/user');
const { Tea } = require('./models/tea');
const { auth }  = require('./controllers/auth');

//setting middlewares
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser.json());
app.use(cookieParser());

//heroku specific instructions on build
app.use(express.static('client/build'));


// ------------ USER ROUTES ----------- //

//POST REGISTER
app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  //console.log(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({ success: true, user: doc });
  });
});

// POST LOG IN
app.post('/api/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    console.log(req.body.email);

    if (!user) return res.json({ isAuth: false, message: 'Email not found' });
    user.comparePassword(req.body.password, (err, Matches) => {
      if (!Matches) return res.json({ isAuth: false, message: 'Incorrect Password' });

      //abilty to catch info on user and check if currently logged in.
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({ isAuth: true, id: user._id, email: user.email });
      });
    });

  });
});

//LOGOUT
app.get('/api/logout', auth, (req, res) => {
  console.log('hitting logout route');
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

//GET CREATOR
app.get('/api/creator', (req, res) => {
  let id = req.query.id;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ firstname: doc.firstname, lastname: doc.lastname });
  });
});

//RESTRICTING ROUTES
app.get('/api/auth', auth, (req, res) => {
  res.json({ isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname, });
});

//GRABS TEAS MADE BY A SPECIFIC USER
app.get('/api/user/teas', (req, res) => {
    Tea.find({ ownerId: req.query.user }).exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.send(docs);
    });
  });

// ------------ TEA ROUTES ----------- //

//  GET //
//get all teas
app.get('/api/teas', (req, res) => {

  // locahost:3001/api/teas?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // order = asc || dsc
  Tea.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, teas) => {
    if (err) return res.status(400).send(err);
    console.log(teas);
    res.send(teas);
  });
});

//get one tea
app.get('/api/tea', (req, res) => {
  let id = req.query.id;

  Tea.findById(id, (err, tea) => {
    if (err) return res.status(400).send(err);
    res.send(tea);
  });
});

// POST -- ADD NEW TEA //
app.post('/api/tea/create_tea', (req, res) => {
  const tea = new Tea(req.body);

  tea.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      teaId: doc._id,
    });
  });
});

// UPDATE //
app.post('/api/profile/tea_update', (req, res) => {
  Tea.findOneAndUpdate(req.body._id, req.body, { new: true }, (err, tea) => {
    if (err) return res.status(400).send(err);
    res.json({ success: true, tea });
  });
});

// DELETE //
app.delete('/api/profile/tea_delete', (req, res) => {
  let id = req.query.id;

  Tea.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});

//production reading of where to get files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));

    //module from node to work with directory
  });
};

//defining port value
const port = process.env.PORT || 3001;

//local server connection
app.listen(port, (err) => {
  if (!err)
    console.log(`Tea starting to brew locally on ${port}!!`);
  else console.log(`${port} is down... figure something out quick! The error is: ${err}`);
});
