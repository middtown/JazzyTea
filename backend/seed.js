//Initail database with our basic data for page
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jazzytea');
const Tea = require('./models/tea');

console.log(Tea);

Tea.remove({}, function (err) {
  if (err) {
    console.log('ERROR:', err);
  }
});

const seedTeas = [{
  title: 'Refresh',
  description: 'description of what this can do for you.',
  creator: 'Sarah Farr',
  creatorId: '',
  taste: 'Earthy, Minty & Spicy',
  action: 'Supports digestion, Adaptogenic',
  bodysystem: 'Nervous, Digestive & Immune',
  steeping: 'Steeping / creating instructions.',
  ingredients: 'What you need to make this.',
  type: 'immune-support',
  image: 'http://via.placeholder.com/300x300',
  page: 81,
  rating: 5,
  comment: 'Best Tea I have ever had!',
}, {
  title: 'Repose',
  description: 'description of what this can do for you.',
  creator: 'Sarah Farr',
  creatorId: '',
  taste: 'Rich roasted base with a good balance of sweet and slightly sour',
  action: 'General tonic',
  bodysystem: 'Nervous & Immune',
  steeping: 'Steeping / creating instructions.',
  ingredients: 'What you need to make this.',
  type: 'general-support',
  image: 'http://via.placeholder.com/300x300',
  page: 82,
  rating: 5,
  comment: 'Best Tea I have ever had!',
}, {
  title: 'Brain Tonic',
  description: 'description of what this can do for you.',
  creator: 'Sarah Farr',
  creatorId: '',
  taste: 'Aromatic spices, mint and rosemary',
  action: 'Brain tonic',
  bodysystem: 'Nervous',
  steeping: 'Steeping / creating instructions.',
  ingredients: 'What you need to make this.',
  type: 'energy-support',
  image: 'http://via.placeholder.com/300x300',
  page: 106,
  rating: 5,
  comment: 'Best Tea I have ever had!',
},
];

Tea.create(seedTeas, (error, tea) => {
  if (error) {
    return console.log('error' + error);
  };

  console.log('Teas seeded' + tea);
  console.log('initial teas!!!');
  mongoose.connection.close();
});
