'use strict';

const express = require('express');
const router = express.Router();
const URL = require('../models/URL');

router.post('/genUrl', function(req, res) {

  //Bless regex
  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);
  let input = req.body.url;
  let shortUrl;

  console.log(req.body.url + '1')

  if (input.match(regex)) {
    console.log(req.body.url + '2')
    //search if original url
    //console.log('Finding url');
    URL.findOne({originalUrl: req.body.url}, function(err, url) {
      
      if (url) {
        shortUrl = url.shortenedUrl;
        req.session.url = url.shortenedUrl;
      }

      if(!url) {
        console.log('No Url in Database');

        //Generate shortened url
        genUrl(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        function genUrl(length, chars) {
          let result = '';
          for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
          let newURL = new URL();

          //See if the url has http/s in the url, if not, add it (needed for res.redirect)
          if(!req.body.url.indexOf('http://') || !req.body.url.indexOf('https://')) {
            console.log('Has Http/s');
            newURL.originalUrl = req.body.url;
          } else {
            console.log('No http/s');
            newURL.originalUrl = 'http://' + req.body.url;
          }

          //create short url, add it to the session so it can be displayed at the index
          newURL.shortenedUrl = result;
          req.session.url = newURL.shortenedUrl;
          newURL.save(function(err) {
            if(err) throw err;
          });
        }
      }
      return res.redirect('/');
    });

  } else {
    req.session.url = "Adjust and resubmit URL";
    console.log("Resubmit URL");
    return res.redirect('/');
  }
});

module.exports = router;
