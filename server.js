// server.js
// This file sets up the Express server and imports the necessary routes for fuel economy calculations.

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Middleware to handle JSON requests
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import routes for authentication
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Import routes for vehicle data
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import routes for vehicle data
const getVehicleDataRoutes = require('./routes/getVehicleData');
app.use('/getVehicleData', getVehicleDataRoutes);

// Import routes for garage management
const garageRoutes = require('./routes/garage');
app.use('/api/garage', garageRoutes);