const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    developer: {
        type: String,
        default: ''
    },
    publisher: {
        type: String,
        default: ''
    },
    year: {
        type: Number,
        default: ''
    },
    genre: String,
    rating: {
        type: Number,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
});
const game = new mongoose.model('Product', schema);
module.exports = game;