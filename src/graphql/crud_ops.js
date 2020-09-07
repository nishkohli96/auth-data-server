import { request } from 'graphql-request';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
import { username, pswd, server, airbnb_DB, airbnb_collection } from '../constants';

const url = `mongodb+srv://${username}:${pswd}@${server}/${airbnb_DB}?retryWrites=true&w=majority`;

const client = new MongoClient(url, { useNewUrlParser: true,useUnifiedTopology: true });