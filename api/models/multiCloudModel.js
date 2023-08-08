'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CloudSchema = new Schema({
  file_name: {
    type: String,
    required: 'Kindly enter the name of the file'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String,
    required: 'Kindly enter the name of the user'
  },
  location: {
      type: String,
      enum: ['AWS', 'Azure'],
    default: 'Azure'
  }
});

module.exports = mongoose.model('Cloud', CloudSchema);
