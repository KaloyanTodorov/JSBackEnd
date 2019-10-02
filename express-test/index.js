const express = require('express');
const port = 8080;
const api = require('./api');
const handlebars = require('express-handlebars');
const users = require('./data/users.json');

const app = express();

app.use(express.static(__dirname + '/public'));


app.engine('.hbs', handlebars({
    extname: '.hbs'
}) );

app.set('views', __dirname + '/views');

function defaultHandler(req, res) {
    console.log(users);
    
    res.render('index.hbs', {
        title: "Some title",
        body: "Default body of page",
        users
    });
}

app.use('/api', api);

app.get('/', defaultHandler);

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });


// Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});