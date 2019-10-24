const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true
    },
    accessories: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Accessories'
    }]
});

module.exports = mongoose.model('Cube', cubeSchema);