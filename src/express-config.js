const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const author_routes = require('./routes/author-routes');
const passport_routes = require('./routes/passport-routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/author', author_routes);
app.use('/auth', passport_routes);

module.exports = app;

