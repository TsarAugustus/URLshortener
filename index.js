const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

//session for express
app.use(session({
  secret: 'url',
  resave: false,
  saveUninitialized: true
}));

//database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/url', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

//Simpy for the style sheet
app.use(express.static(path.join(__dirname, 'public')));

//view engine stuff
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.pug');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
const routes = require('./routes/index');
const api = require('./routes/api');
app.use('/', routes);
app.use('/api', api);

app.listen(port, () => console.log(`Server starting at http://localhost:${port}`));
