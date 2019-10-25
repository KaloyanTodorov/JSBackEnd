// TODO: Require Controllers...
const controllers = require('../controllers');

module.exports = (app) => {
    app.get('/create', controllers.cube.get.create);
    app.post('/create', controllers.cube.post.create);
    
    app.get('/details/:id', controllers.cube.get.details);

    app.get('/create/accessory', controllers.accessory.get.create);
    app.post('/create/accessory', controllers.accessory.post.create);

    app.get('/attach/accessory/:id', controllers.accessory.get.attach);
    app.post('/attach/accessory/:id', controllers.accessory.post.attach);
    
    app.get('/about', controllers.cube.get.about);
    app.get('/', controllers.cube.get.showIndex);
    app.get('*', controllers.cube.get.notFound);
};