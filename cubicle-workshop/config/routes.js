// TODO: Require Controllers...

module.exports = (app) => {
    // TODO...
    app.get('/', function (req, res) {
        res.render('index.hbs');
    });
};