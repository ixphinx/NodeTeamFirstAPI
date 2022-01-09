const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(express.json());

//Database
mongoose.connect('mongodb+srv://admin:huevon33@database.aizqn.gcp.mongodb.net/jobs?retryWrites=true&w=majority')
    .then(console.log('Database online'))
    .catch(err => console.log(err));


//Routes
app.set('/per', require('./src/routes/persons'));
app.set('/bus', require('./src/routes/business'));
app.set('/', require('./src/routes/index'));

//Listen
app.listen(3000, ()=>{console.log('JOBS server started')});