const express = require('express');
const users = require('./data/users.json');

const router = express.Router();

function getCurrentUsers(req, res, next) {

    // next(); // --> this will call next middleware
    setTimeout(function() {
        req.user = users[0];
        next();
    }, 300);
}

function auth(req, res, next) {
    next(req.user ? undefined : new Error("Not allowed"));
}

router.get('/user', getCurrentUsers, auth, (req, res) => {
    res.send(users);
});

router.get('/user/:id', getCurrentUsers, auth, (req, res) => {
    res.send(users.find(u => u.id === +req.params.id));
});

module.exports = router;