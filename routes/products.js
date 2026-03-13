const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all product models
router.get('/models', async (req, res) => {
  const snapshot = await db.collection('productModels').get();
  const models = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(models);
});

// Create a new product model
router.post('/models', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('productModels').add(data);
  res.json({ id: ref.id });
});

// Get all product instances
router.get('/instances', async (req, res) => {
  const snapshot = await db.collection('productInstances').get();
  const instances = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(instances);
});

// Create a new product instance
router.post('/instances', async (req, res) => {
  const data = req.body;
  const ref = await db.collection('productInstances').add(data);
  res.json({ id: ref.id });
});

// Update a product instance by ID
router.put('/instances/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await db.collection('productInstances').doc(id).update(data);
  res.sendStatus(204);
});

// Get processes (events) linked to a product instance
router.get('/instances/:id/processes', async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.collection('processesModels')
      .where('inputs', 'array-contains', id)
      .get();
    const processes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(processes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product instance by ID
router.get('/instances/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('productInstances').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product instance not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product instance by ID
router.delete('/instances/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('productInstances').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;