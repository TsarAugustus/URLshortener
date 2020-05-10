'use strict';

const express = require('express');
const router = express.Router();
const URL = require('../models/URL');

router.get('/', function(req, res) {
  //Routing for main page
  return res.render('index');
});

router.get('/:url', function(req, res) {
  console.log('get url ' + req.params.url)
  let redirectUrl;
  URL.findOne({shortenedUrl: req.params.url}, function(err, url) {
    return res.render('urlPage', {url: url});

  });
});

module.exports = router;
