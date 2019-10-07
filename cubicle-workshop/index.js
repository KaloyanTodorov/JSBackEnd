const env = process.env.NODE_ENV || 'development';
global.__globaldir = __dirname;

// const cubeModel = require('./models/cube');

// cubeModel.insert({name: 'tetst2', desc: "testst desc"})
//     .then(insertedCube => {
//         console.log(insertedCube);
//         return cubeModel.delete(insertedCube.id);
//     });



const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);



app.listen(
    config.port, 
    console.log(`Listening on port ${config.port}! Now its up to you...`
));