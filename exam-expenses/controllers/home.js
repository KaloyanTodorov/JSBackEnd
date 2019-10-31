const models = require('../models');


module.exports = {
    get: {
        home: (req, res) => {
            const username = req.cookies['username'];
            if(username) {
                const userId = models.user.find({ username: req.cookies['username'] })
                    .then(user => {
                        return models.expense.find({ user: user[0].id})
                    })
                    .then((expenses) => {
                        
                        res.render('home.hbs', { expenses });
                    })
            } else {
                res.render('home.hbs');
            }

        }
    }
}