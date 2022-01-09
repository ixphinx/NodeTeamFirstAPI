const mongoose = require('mongoose');
const {Schema} = mongoose;
const Persons = require('./persons');
const Business = require('./business');

const Data = new Schema({
    //USERS
    nickname: String,
    password: String,
    email: String,
    is_blocked: Boolean,
    disabled_date: Date,
    accept_terms: Boolean,
    created_at: Date,
    updated_at: Date,
    role: String,
    ///////////////////

    //Aditional data
    persons_data: Persons,
    business_data: Business,

});

module.exports = mongoose.model('Data', Data);