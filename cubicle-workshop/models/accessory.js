const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    cubes: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessories', accessoriesSchema);