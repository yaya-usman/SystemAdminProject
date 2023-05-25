const mongoose = require('mongoose');

const ipSchema = mongoose.Schema({
    ipAddress: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    flag: {
        type: String
    },
    timeCreated: {
        type: String
    }
})

const IP = mongoose.model('IP', ipSchema);

module.exports = IP;
