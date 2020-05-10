'use strict';

const express = require('express');
const router = express.Router();
const URL = require('../models/URL');

router.post('/genUrl', function(req, res) {

  //Bless regex
  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);
  let input = req.body.url;

  if (input.match(regex)) {
    //search if original url
    console.log('Finding url');
    URL.findOne({originalUrl: req.body.url}, function(err, url) {
      console.log(url);
      let shortUrl;
      if (url) {
        console.log('Url found ' + url.originalUrl);
        shortUrl = url.shortenedUrl;
      }

      if(!url) {
        console.log('No Url in Database');

        //Generate shortened url
        genUrl(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        function genUrl(length, chars) {
          let result = '';
          for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
          let newURL = new URL();
          newURL.originalUrl = req.body.url;
          newURL.shortenedUrl = result;
          newURL.save(function(err) {
            if(err) throw err;
            //console.log('saved');
          });
          shortUrl = result;
          //console.log(result);
        }
      }
      console.log(shortUrl);
      return res.redirect('/' + shortUrl);
    });



    //push url and shortened url to model and database

  } else {
    //Reject, as it isn't a real url
    console.log("Resubmit URL");
  }
  //console.log(req.body);

  // return res.redirect('/');
});

module.exports = router;
