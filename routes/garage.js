const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();
const GARAGES = db.collection('garages');
const SERVICE = db.collection('serviceRecords');

// Get all cars for a user
router.get('/:userId/cars', async (req, res) => {
  try {
    const doc = await GARAGES.doc(req.params.userId).get();
    res.json(doc.exists ? doc.data().cars || [] : []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// Add a car to user's garage
router.post('/:userId/cars', async (req, res) => {
  try {
    console.log('POST /api/garage/:userId/cars', req.params.userId, req.body);
    const ref = GARAGES.doc(req.params.userId);
    const doc = await ref.get();
    const car = req.body;
    if (!doc.exists) {
      // Create new garage with this car
      await ref.set({ cars: [car] });
    } else {
      // Add to existing garage
      await ref.update({
        cars: admin.firestore.FieldValue.arrayUnion(car)
      });
    }
    res.json({ message: 'Car added to garage' });
  } catch (err) {
    console.error('Failed to add car to garage:', err);
    res.status(500).json({ error: 'Failed to add car to garage' });
  }
});

// Delete a car from user's garage
router.delete('/:userId/cars/:carId', async (req, res) => {
  try {
    const ref = GARAGES.doc(req.params.userId);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Garage not found' });
    const cars = (doc.data().cars || []).filter(car => car.carId !== req.params.carId);
    await ref.update({ cars });
    res.json({ message: 'Car deleted from garage' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete car from garage' });
  }
});

// Update a car's mileage
router.patch('/:userId/cars/:carId/mileage', async (req, res) => {
  try {
    const { mileage } = req.body;
    const ref = GARAGES.doc(req.params.userId);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Garage not found' });
    const cars = doc.data().cars.map(car =>
      car.carId === req.params.carId ? { ...car, mileage } : car
    );
    await ref.update({ cars });
    res.json({ message: 'Mileage updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mileage' });
  }
});

// Add a service record to a car
router.post('/:carId/service', async (req, res) => {
  try {
    const record = req.body;
    const ref = SERVICE.doc(req.params.carId);
    await ref.set({
      records: admin.firestore.FieldValue.arrayUnion(record)
    }, { merge: true });
    res.json({ message: 'Service record added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service record' });
  }
});

// Get all service records for a car
router.get('/:carId/service', async (req, res) => {
  try {
    const doc = await SERVICE.doc(req.params.carId).get();
    res.json(doc.exists ? doc.data().records || [] : []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service records' });
  }
});

module.exports = router;