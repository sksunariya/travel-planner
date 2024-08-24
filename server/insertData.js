const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Itinerary = require('./models/Itinerary');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    insertData();
}).catch(err => console.log(err));

// Sample travel data
const itineraries = [
    {
        destination: "Mumbai",
        days: 1,
        itinerary: [
            { day1: ["Gateway of India", "Marine Drive"] }
        ]
    },
    {
        destination: "Mumbai",
        days: 2,
        itinerary: [
            { day1: ["Gateway of India", "Marine Drive"] },
            { day2: ["Chhatrapati Shivaji Maharaj Terminus", "Haji Ali Dargah"] }
        ]
    },
    {
        destination: "Delhi",
        days: 1,
        itinerary: [
            { day1: ["India Gate", "Red Fort"] }
        ]
    },
    {
        destination: "Delhi",
        days: 2,
        itinerary: [
            { day1: ["India Gate", "Red Fort"] },
            { day2: ["Qutub Minar", "Lotus Temple"] }
        ]
    },
    {
        destination: "Bangalore",
        days: 1,
        itinerary: [
            { day1: ["Lalbagh Botanical Garden", "Bangalore Palace"] }
        ]
    },
    {
        destination: "Bangalore",
        days: 2,
        itinerary: [
            { day1: ["Lalbagh Botanical Garden", "Bangalore Palace"] },
            { day2: ["Cubbon Park", "Vidhana Soudha"] }
        ]
    },
    {
        destination: "Jaipur",
        days: 1,
        itinerary: [
            { day1: ["Amer Fort", "City Palace"] }
        ]
    },
    {
        destination: "Jaipur",
        days: 2,
        itinerary: [
            { day1: ["Amer Fort", "City Palace"] },
            { day2: ["Hawa Mahal", "Jantar Mantar"] }
        ]
    },
    {
        destination: "Goa",
        days: 1,
        itinerary: [
            { day1: ["Baga Beach", "Fort Aguada"] }
        ]
    },
    {
        destination: "Goa",
        days: 2,
        itinerary: [
            { day1: ["Baga Beach", "Fort Aguada"] },
            { day2: ["Basilica of Bom Jesus", "Anjuna Beach"] }
        ]
    }
];

const insertData = async () => {
    try {
        await Itinerary.deleteMany({});
        await Itinerary.insertMany(itineraries);
        console.log('Inserted travel data');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting data', error);
    }
};
