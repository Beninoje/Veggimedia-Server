const mongoose = require('mongoose');

// define schema for Media object
let providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

let Provider = mongoose.model('Provider',  providerSchema);
module.exports = Provider;