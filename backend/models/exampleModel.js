const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
  image: String,
  month: String
});

module.exports = mongoose.model('Example', exampleSchema);
