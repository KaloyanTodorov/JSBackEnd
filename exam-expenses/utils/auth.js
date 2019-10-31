const jwt = require('./jwt');
const appConfig = require('../app-config');
const models = require('../models');

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[appConfig.cookie];

    jwt.verifyToken(token)
      .then(data => {
        models.user.findById(data.id).then(user => {
          req.user = user;
          next();
        });
      }).catch(err => {
        if(!redirectUnauthenticated) {
          next();
          return;
        }

        res.redirect('/user/login');

        next(err);
      })

  };
}

module.exports = auth