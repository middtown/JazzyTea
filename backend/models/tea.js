// Tea model and schema
const mongoose = require('mongoose');

const teaSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  creatorId: { type: String, unique: true },
  taste: { type: String, required: true },
  type: { type: String, required: true },
  steeping: { type: String, required: true },
  ingredients: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },

  //comment: { type: String },
},
{ timestamps: true });

const Tea = mongoose.model('Tea', teaSchema);

module.exports = { Tea };
