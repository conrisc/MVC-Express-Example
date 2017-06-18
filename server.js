const express = require('express');
const pug = require('pug');


const pageNotFound = require('./routes/pagenotfound');
const home = require('./routes/home');
const users = require('./routes/users');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

//middleware function 
app.use(function (req, res, next) {
  console.log('Request recieved!');
  next();
})

//routes
app.use('/', home);
app.use('/users', users);

//404 handler
app.use(pageNotFound);


app.listen(3000, ()=>{
    console.log('Example app listening on port 3000!');
});