const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/url', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

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
