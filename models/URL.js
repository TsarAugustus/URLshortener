'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URL = new Schema({
  url: String,
  urlReq: String
});

module.exports = mongoose.model('post', Post);
