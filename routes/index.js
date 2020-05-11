'use strict';

const express = require('express');
const router = express.Router();
const URL = require('../models/URL');

router.get('/', function(req, res) {
  if(req.session.url) {
    console.log(req.session.url);
    return res.render('index', {url: req.session.url});
  }
  //Routing for main page
  console.log(req.session.url);
  return res.render('index');
});

router.get('/u/:url', function(req, res) {
  URL.findOne({shortenedUrl: req.params.url}, function(err, url) {
    if(err)
      throw new Error('Error');
    console.log(url.originalUrl);
    return res.redirect(url.originalUrl);

  });
});

module.exports = router;
