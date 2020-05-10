'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URL = new Schema({
  originalUrl: String,
  shortenedUrl: String
});

module.exports = mongoose.model('url', URL);
