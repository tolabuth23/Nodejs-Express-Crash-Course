const path = require('path');
const express = require('express');
const app = express();
const restaurantsRouter = require('./routes/restaurants');
const logger = require('./middleware/logger');
const { engine } = require ('express-handlebars');
const indexRouter = require('./routes/index');



//Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Custom middleware
app.use(logger);

//tample engines

app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs');


//Routes 
app.use('/apis/restaurants', restaurantsRouter);
app.use('/', indexRouter);

app.listen(3000, ()=>{
    console.log('Listening to port 3000');
});