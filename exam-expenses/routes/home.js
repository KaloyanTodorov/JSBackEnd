const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.home.get.home);
router.get('/home', controllers.home.get.home);
router.get('/index', controllers.home.get.home);
router.get('/index.html', controllers.home.get.home);

module.exports = router;