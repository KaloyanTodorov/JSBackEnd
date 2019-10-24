const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
    // app.set('views', path.resolve(__globaldir, 'views'));
    
    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: false }));
    
    //TODO: Setup the static files
    app.use(express.static(path.resolve(__globaldir, 'static')));

};