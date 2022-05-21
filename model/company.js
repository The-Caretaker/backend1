const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: true
    },
    founders: {
        type: String,
        required: true,
        default: ''
    },
    year: {
        type: String,
        default: '',
    },
    description: {
        type: String
    },
    country: {
        type: String
    },
    status: {
        type: String
    }
});
const company = new mongoose.model('Company', schema);
module.exports = company;