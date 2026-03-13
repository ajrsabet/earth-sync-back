const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all process models
router.get('/models', async (req, res) => {
  const snapshot = await db.collection('processModels').get();
  const models = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(models);
});

// Create a new process model
router.post('/models', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('processModels').add(data);
  res.json({ id: ref.id });
});

// Get all process instances
router.get('/instances', async (req, res) => {
  const snapshot = await db.collection('processInstances').get();
  const instances = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(instances);
});

// Create a new process instance
router.post('/instances', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('processInstances').add(data);
  res.json({ id: ref.id });
});

// TODO: Add update, delete, and get-by-id endpoints as needed

module.exports = router;