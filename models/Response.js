// Simplified Schema (models/Response.js)
const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  output: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Response', ResponseSchema);