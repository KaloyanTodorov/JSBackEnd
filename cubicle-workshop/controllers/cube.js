const models = require("../models");

module.exports = {
    
    get: {
        showIndex: function (req, res, next) {
            models.cube.find()
                .then(cubes => {
                    res.render('index.hbs', { cubes });
                }).catch(next);
        },
        details: function (req, res, next) {
            const { id } = req.params;
            
            models.cube.findById({_id: id}).populate('accessories')
                .then(cube => {
                    if(!cube) {
                        res.redirect('/not-found');
                        return; 
                    }
            
                    res.render('details.hbs', { cube });
                }).catch(next);
        },
        about: function (req, res) {
            res.render("about.hbs");
        },
        notFound: function (req, res) {
        res.render("404.hbs");
        },
        create: function (req, res) {
            res.render('createCube.hbs');
        }
    },
    post: {
        create: function(req, res, next) {
            const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
            models.cube.create({name, description, imageUrl, difficultyLevel})
                .then(cube => {
                    res.redirect('/');
                })
                .catch(next);
        }
    }
}
