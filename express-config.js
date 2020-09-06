const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./express-config-routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',router);

module.exports = app;

