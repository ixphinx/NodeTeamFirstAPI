const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//Inicializations
const app = express();
require('./src/passport/local-auth.js');


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); /*If html form is used */
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));


//Database
mongoose.connect('mongodb+srv://admin:huevon33@database.aizqn.gcp.mongodb.net/jobs?retryWrites=true&w=majority')
    .then(console.log('Database online'))
    .catch(err => console.log(err));


//Routes
app.use('/', require('./src/routes/index.js')); /*Main route*/
app.use('/per', require('./src/routes/persons.js')); /*All related Persons routes*/
app.use('/bus', require('./src/routes/business.js')); /*All related Business routes */


//Listen
app.listen(process.env.PORT || 3000, () => { console.log('JOBS server started') });