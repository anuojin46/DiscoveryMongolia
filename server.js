const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and model
const itinerarySchema = new mongoose.Schema({
  name: String,
  mood: String,
  region: String,
  season: String,
  duration: String,
  days: [
    {
      day: String,
      schedule: [[String]]  // Each schedule is an array: [Time, Province, Location, Activity, Transportation]
    }
  ]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

// API route: get all or filter by query
app.get('/api/itineraries', async (req, res) => {
  try {
    const { mood, region, season, duration, name } = req.query;
    const filter = {};

    if (mood) filter.mood = mood;
    if (region) filter.region = region;
    if (season) filter.season = season;
    if (duration) filter.duration = duration;
    if (name) filter.name = name;

    const itineraries = await Itinerary.find(filter);
    res.json(itineraries);
  } catch (err) {
    console.error('Error fetching itineraries:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Base route (optional)
app.get('/', (req, res) => {
  res.send('Travel API is running 🚀');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
