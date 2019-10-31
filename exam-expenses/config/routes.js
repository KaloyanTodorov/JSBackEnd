const routes = require('../routes');

module.exports = (app) => {
    app.use('/', routes.home);
    
    app.use('/user', routes.user);

    app.use('/expense', routes.expense);    
    
    app.use('*', (req, res) => {
        res.render('404.hbs', { errorMessage: "Not found" })
    });
};