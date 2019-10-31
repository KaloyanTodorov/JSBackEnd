const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/create', auth(), controllers.expense.get.create);
router.post('/create', auth(), controllers.expense.post.create);

router.get('/report/:id', auth(), controllers.expense.get.report);

router.get('/delete/:id', auth(), controllers.expense.delete);


module.exports = router;