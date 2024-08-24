
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    itinerary: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
