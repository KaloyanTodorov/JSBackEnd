const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');

const appConfig = require('../app-config');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.engine('hbs', handlebars({ 
        layoutsDir: 'views',
        extname: 'hbs', 
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials',
    }));

    app.use((req, res, next) => {
        res.locals.isLoggedIn = req.cookies[appConfig.cookie] !== undefined;
        res.locals.username = req.cookies['username'];

        next();
    })
    
    app.set('view engine', 'hbs');
    
    app.use(express.static(path.resolve(__basedir, 'static')));
};