const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person = new Schema({
    name: String,
    age: Number,
});

/* Saved in a collection named people  */
const PersonModel = mongoose.model('Person', Person);

module.exports = PersonModel;
