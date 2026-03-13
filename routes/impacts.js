const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all impacts models
router.get('/models', async (req, res) => {
  const snapshot = await db.collection('impactModels').get();
  const models = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(models);
});

// Create a new impacts model
router.post('/models', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('impactModels').add(data);
  res.json({ id: ref.id });
});

// Get all impacts instances
router.get('/instances', async (req, res) => {
  const snapshot = await db.collection('impactInstances').get();
  const instances = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(instances);
});

// Create a new impacts instance
router.post('/instances', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('impactInstances').add(data);
  res.json({ id: ref.id });
});

// TODO: Add update, delete, and get-by-id endpoints as needed

module.exports = router;