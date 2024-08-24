
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');


router.post('/', async (req, res) => {
    let { destination, days } = req.body;
    destination = destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    try {
        const itinerary = await Itinerary.findOne({ destination, days });
        console.log("plan in itinerary route: ", itinerary);
        if (!itinerary) {
            return res.status(404).json({ message: 'No itinerary found for the specified city and number of days' });
        }

        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching itinerary', error });
    }
});

module.exports = router;
