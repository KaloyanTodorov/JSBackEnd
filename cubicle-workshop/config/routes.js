// TODO: Require Controllers...
const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    app.get('/details/:id', cubeController.details);

    app.get('/not-found', cubeController.notFound);

    app.get('/', cubeController.showIndex);
};