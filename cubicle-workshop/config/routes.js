// TODO: Require Controllers...
const controllers = require('../controllers');

module.exports = (app) => {
    app.get('/details/:id', controllers.cube.details);

    app.get('/about', controllers.cube.about);
    
    app.get('/', controllers.cube.showIndex);
    
    app.get('*', controllers.cube.notFound);
};