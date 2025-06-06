const express = require('express');
const fetch = require('node-fetch');
const app = express();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get('/nearby', async (req, res) => {
  const { lat, lng, type, radius = 1000 } = req.query;

  if (!lat || !lng || !type) {
    return res.status(400).json({ error: 'Missing required parameters: lat, lng, type' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Google Places API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.toString() });
  }
});

module.exports = app;
