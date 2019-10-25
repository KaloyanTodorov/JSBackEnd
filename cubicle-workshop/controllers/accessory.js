const models = require('../models');

module.exports = {
    get: {
        create: function(req, res) {
            res.render('createAccessory.hbs');
        },
        attach: function(req, res, next) {
            const { id: cubeId } = req.params;
            models.cube.findById( cubeId )
            .then(
                cube => Promise.all([cube, models.accessories.find({ cubes: { $nin: cubeId } })])
                ).then(([cube, filterAccessories]) => {
                    res.render('attachAccessory.hbs', {
                    cube,
                    accessories: filterAccessories.length > 0 ? filterAccessories : null
                    });
                })
            .catch(next);
        }
    },
    post: {
        create: function(req, res, next) {
            const { name = null, description = null, imageUrl = null } = req.body;

            models.accessories.create({ name, description, imageUrl })
                .then(createdAccessory => {
                    res.redirect('/');
                })
                .catch(next);
        },
        attach(req, res, next) {
            const { id: cubeId } = req.params;
            const { accessory: accessoryId } = req.body;
            Promise.all([
                models.cube.findByIdAndUpdate({ _id: cubeId }, { $push: { accessories: accessoryId } }),
                models.accessories.findByIdAndUpdate({ _id: accessoryId }, { $push: { cubes: cubeId } })
              ])
                .then(() => {
                  res.redirect('/');
                })
                .catch(next);
        }
    }
}