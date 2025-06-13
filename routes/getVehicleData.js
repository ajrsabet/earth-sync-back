// getVehicleData.js
// This file contains the routes for fetching vehicle data from the fueleconomy.gov API.

const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://www.fueleconomy.gov/ws/rest/vehicle';

// Get available years
router.get('/years', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/menu/year`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch years' });
  }
});

// Get makes for a year
router.get('/makes/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const response = await axios.get(`${API_URL}/menu/make?year=${year}`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch makes' });
  }
});

// Get models for a year and make
router.get('/models/:year/:make', async (req, res) => {
  try {
    const { year, make } = req.params;
    const response = await axios.get(`${API_URL}/menu/model?year=${year}&make=${make}`, {
      headers: { Accept: 'application/json' }
    });
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// Get vehicle options for year, make, model
router.get('/options/:year/:make/:model', async (req, res) => {
  try {
    const { year, make, model } = req.params;
    const response = await axios.get(
      `${API_URL}/menu/options?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`,
      { headers: { Accept: 'application/json' } }
    );
    // If you want to support XML, change Accept header and parse as needed
    res.json(response.data.menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch options' });
  }
});

// Get vehicle specs for year, make, model
router.get('/vehicle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Accept: 'application/xml' }
    });
    res.send(response.data); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle data' });
  }
});

module.exports = router;