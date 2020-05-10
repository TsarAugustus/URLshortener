const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//view engine stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.pug');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routing for main page
app.get('/', function(req, res) {
  return res.render('index');
});

app.post('/api/genUrl', function(req, res) {

  genUrl(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    function genUrl(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    console.log(result);
  }

  //Bless regex
  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);
  let t = req.body.url;

  if (t.match(regex)) {
    //Generate shortened url
    console.log("Successful match");
    //push url and shortened url to model and database
  } else {
    //Reject, as it isn't a real url
    console.log("No match");
  }
  //console.log(req.body);

  return res.redirect('/');
})

//Generate url

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
