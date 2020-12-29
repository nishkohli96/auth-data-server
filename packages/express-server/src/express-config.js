const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const airbnb_routes = require('_routes/airbnb-routes');
const author_routes = require('_routes/author-routes');
const passport_routes = require('_routes/passport-routes');

const gqlServer = require('_graphql/basic-server');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/airbnb', airbnb_routes);
app.use('/author', author_routes);
app.use('/auth', passport_routes);

gqlServer.applyMiddleware({ app });

module.exports = app;
