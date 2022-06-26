const mongoose = require('mongoose');

const registerAdminSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        max: 255

    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 255

    },
    phoneNumber: {
        type: Number,
        require: true,
        min: 9,

    },
    date: {
        type: Date,
        default: Date.now

    }



});

module.exports = mongoose.model('RegisterAdmin', registerAdminSchema)