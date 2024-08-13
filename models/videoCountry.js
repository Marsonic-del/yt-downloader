const mongoose = require('mongoose');

const category = new mongoose.Schema({
    1: [String],
    10: [String],
    20: [String],
    24: [String],
    99: [String],
})

const date = new mongoose.Schema({
    date: Date,
    categories: [category],
})

const videoCountrySchema = new mongoose.Schema({
    code: { type: String, index: true, unique: true, required: true, },
    name: String,
    dates: [date],
});

module.exports = mongoose.model('videoCountry', videoCountrySchema);