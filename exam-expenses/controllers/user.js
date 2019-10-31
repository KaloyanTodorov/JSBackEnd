const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');
const { validationResult } = require('express-validator');

module.exports = {
  get: {
    login: function (req, res) {
      res.render('user/login.hbs');
    },
    register: function (req, res) {
      res.render('user/register.hbs');
    },
    logout: function (req, res) {
      
      res
      .clearCookie(appConfig.cookie)
      .clearCookie('username');

      res.redirect('/');
    }
  },
  post: {
    login: function (req, res, next) {
      const { username, password } = req.body;

      models.user.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
          if (!match) {
            res.render('user/login.hbs', { massage: 'Wrong password or username!' });
            return;
          }
          const token = utils.jwt.createToken({ id: user._id });

          res
            .cookie(appConfig.cookie, token)
            .cookie('username', user.username)
            .redirect('/');
        })
        .catch((err) => {
          
          res.render('user/login.hbs', { errorMessages: ["Invalid username"] });
          return;

        });
    },
    register: function (req, res, next) {
      const { username, password, amount } = req.body;
      const confirmPassword = req.body['confirm-password'];

      if(password !== confirmPassword) {
        res.render('user/register.hbs', { errorMessages: ["Passwords should match"]});
        return;
      }

      models.user.create({ username, password, amount })
        .then(() => {
          res.redirect('/user/login');
        })
        .catch((err) => {
          if(err.name === 'ValidationError') {
            const errorMessages = Object.entries(err.errors).map(tuple => {
              return tuple[1].message;
            })

            res.render('user/register.hbs', { errorMessages });
            return;
          }

          if(err.code === 11000 && err.name === 'MongoError') {

            res.render('user/register.hbs', { errorMessages: ["Duplicate username"] });
            return;
          }

        }
        );
    }
  },
  update: (req, res) => {
    const { amount } = req.body;
    models.user.findOne({ username: req.cookies['username'] })
      .then((user) => {
        const amountToUpdate = user.amount + (+amount);
        return models.user.findByIdAndUpdate(user._id, { amount: amountToUpdate }, { runValidators: true })
      })
      .then(() => {
        res.redirect('/');
      });
  }
};
