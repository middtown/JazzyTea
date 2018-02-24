// Tea model and schema
const mongoose = require("mongoose");

const teaSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  creator: {type: String, required: true},
  taste: {type: String, required: true},
  action: {type: String, required: true},
  bodysystem: {type: String, default:'n/a'},
  steeping: {type: String, required: true},
  ingredients: {type: String, required: true},
  type: {type: String, required: true},
  image: {type: String, required: true},
  page: {type: Number},
  rating: {type: Number, required: true, min: 1, max: 5},
  comment: {type: String}
},
{timestamps:true})



const Tea = mongoose.model('Tea', teaSchema);

module.exports = { Tea };
