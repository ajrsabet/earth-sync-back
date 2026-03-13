// server.js
// This file sets up the Express server and imports the necessary routes for fuel economy calculations.
console.log("Starting server.js...");

require('dotenv').config();
console.log("PORT environment variable:", process.env.PORT);

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Check if the service account key file exists
let adminConfig = {}; 
// If in production, use application default credentials
// Otherwise, use the service account key file
if (process.env.NODE_ENV === "production") {
  adminConfig = {
    credential: admin.credential.applicationDefault(),
  };
} else {
  adminConfig = {
    credential: admin.credential.cert(require('./serviceAccountKey.json')),
  };
}
// Initialize Firebase Admin SDK with the configuration
// console.log("Firebase Admin SDK configuration:", adminConfig);
try {
  console.log("Initializing Firebase Admin SDK...");
  admin.initializeApp(adminConfig);
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
  process.exit(1); // Exit if Firebase initialization fails
}


// Handle uncaught exceptions globally
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const db = admin.firestore();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  console.log("Running in development mode");
  app.use(cors({
    origin: 'http://localhost:3000', // Allow local development frontend
  }));
} else {
  console.log("Running in production mode");
  app.use(cors({
    origin: ['https://earth-sync-462122.web.app', 'https://earth-sync-462122.firebaseapp.com'],
  }));
}


// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Middleware to handle JSON requests
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// // Import routes for authentication
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);


// // Import routes for vehicle data
// const getVehicleDataRoutes = require('./routes/getVehicleData');
// app.use('/getVehicleData', getVehicleDataRoutes);

// // Import routes for garage management
// const garageRoutes = require('./routes/garage');
// app.use('/api/garage', garageRoutes);
const router = require('./router');
app.use('/', router);

// app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
  app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
  });