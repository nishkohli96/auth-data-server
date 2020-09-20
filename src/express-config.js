const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const airbnb_routes = require('./routes/airbnb-routes');
const author_routes = require('./routes/author-routes');
const passport_routes = require('./routes/passport-routes');

const gqlServer = require('./graphql/basic-server');
const { username, pswd, server, dbName } = require('./constants');
const app = express();
const url = `mongodb+srv://${username}:${pswd}@${server}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',() => console.log('Connected to MongoDB Server....'))

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

