
const express = require('express');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const User = require('./models/user');

const cookieParser = require('cookie-parser');
const app= express();

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('assets'));

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err)console.log(err);
    console.log('server is running on :', port);
});