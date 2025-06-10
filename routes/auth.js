const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();
const USERS = db.collection('users');

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // user tried to register 
    console.log('Registering user:', email);

    const userSnap = await USERS.where('email', '==', email).get();
    if (!userSnap.empty) return res.status(400).json({ error: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    await USERS.add({ email, password: hash });
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // user tried to login 
    console.log('Registering user:', email);
    
    const userSnap = await USERS.where('email', '==', email).get();
    if (userSnap.empty) return res.status(400).json({ error: 'Invalid credentials' });
    const user = userSnap.docs[0].data();
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});


module.exports = router;
