// TODO: Require Controllers...
const controllers = require('../controllers');

module.exports = (app) => {
    app.get('/create', controllers.cube.get.create);
    
    app.get('/details/:id', controllers.cube.get.details);

    app.get('/about', controllers.cube.get.about);
    app.get('/', controllers.cube.get.showIndex);
    app.get('*', controllers.cube.get.notFound);
};