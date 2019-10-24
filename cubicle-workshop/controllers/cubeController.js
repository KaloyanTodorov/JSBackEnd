const models = require("../models");

function showIndex(req, res, next) {
    models.cube.find()
        .then(cubes => {
            res.render('index.hbs', { cubes });
        }).catch(next);
}

function details(req, res, next) {
    const id = req.params.id;
    
    models.cube.getOne(id).then(cube => {
        if(!cube) {
            res.redirect('/not-found');
            return; 
        }

        res.render('details.hbs', { cube });
    }).catch(next);
}

function createGet(req, res) {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const newCube = models.cube.create(name, description, imageUrl, difficultyLevel);
    
}

function notFound (req, res) {
    res.render("404.hbs");
}

function about (req, res) {
    res.render("about.hbs");
}

module.exports = {
    showIndex,
    details,
    notFound,
    about
}