// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
// Ensure that the .env file is in the root directory with CLIMATIQ_API_KEY defined

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const API_URL = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu';

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Get available years
app.get('/api/years', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/year`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch years' });
  }
});

// Get makes for a year
app.get('/api/makes/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const response = await axios.get(`${API_URL}/make?year=${year}`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch makes' });
  }
});

// Get models for a year and make
app.get('/api/models/:year/:make', async (req, res) => {
  try {
    const { year, make } = req.params;
    const response = await axios.get(`${API_URL}/model?year=${year}&make=${make}`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// Get vehicle options for year, make, model
app.get('/api/options/:year/:make/:model', async (req, res) => {
  try {
    const { year, make, model } = req.params;
    const response = await axios.get(`${API_URL}/options?year=${year}&make=${make}&model=${model}`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch options' });
  }
});

// Get vehicle details by option ID
