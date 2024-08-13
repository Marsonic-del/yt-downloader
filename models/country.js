const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    etag: {
        type: String
    },
    gl: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model('country', countrySchema);