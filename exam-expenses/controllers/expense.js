const models = require('../models');

module.exports = {
    get: {
        create: function (req, res) {
            res.render('expense/create.hbs');
        },
        report: function(req, res) {
            const { id } = req.params;

            models.expense.findById(id).then(expense => {

                res.render('expense/report.hbs', { expense });
            })

        }
    },
    post: {
        create: function(req, res) {
            const { merchant, total, category, description, report = false } = req.body;
            
            models.user.findOne({ username: req.cookies['username'] })
            .then(user => {
                const reportBoolean = !!report;

                return models.expense.create({ merchant, total, category, description, report: reportBoolean, user: user.id});
            })
            .then(() => {
                return models.user.findOneAndUpdate({ _id: req.user }, { $push: { expenses: req.id } })
            })
            .then(() => {
                res.redirect('/' );
            })
        }
    },
    delete: (req, res) => {
        const {id} = req.params;

        models.expense.findByIdAndRemove(id).then(() => {
            res.redirect('/');
        })
    }
}