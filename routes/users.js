const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs for hashing passwords
const jwt = require('jsonwebtoken'); // Use jsonwebtoken for token generation
const admin = require('firebase-admin'); // Initialize Firebase Admin SDK
const router = express.Router(); 
const crypto = require('crypto'); // Use crypto for generating verification tokens
const nodemailer = require('nodemailer');

const db = admin.firestore(); 
const USERS = db.collection('users'); 

// Determine the base URL based on the environment (development or production)
let baseUrl;

if (process.env.NODE_ENV === 'production') {
  // Production: Use the Cloud Run service URL
  baseUrl = process.env.BASE_URL || 'https://earth-sync-back-somehash-uc.a.run.app'; // Replace with your actual Cloud Run URL
} else {
  // Development: Use localhost
  baseUrl = 'http://localhost:8080';
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  // Change secure for production, true for 465, false for 587 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


// Register
router.post('/register', async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const userSnap = await USERS.where('email', '==', email).get();
    if (!userSnap.empty) return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const userRef = await USERS.add({
      email,
      password: hash,
      userName: userName || '',
      verified: false,
      verificationToken
    });

    // Send verification email
    
    const verifyUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click the link to verify your email: <a href="${verifyUrl}">${verifyUrl}</a></p>`
    });

    res.json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Email verification endpoint
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  try {
    const userSnap = await USERS.where('verificationToken', '==', token).get();
    if (userSnap.empty) return res.status(400).send('Invalid or expired verification link.');
    const userDoc = userSnap.docs[0];
    await USERS.doc(userDoc.id).update({ verified: true, verificationToken: admin.firestore.FieldValue.delete() });
    res.send('Email verified! You can now log in.');
  } catch (err) {
    res.status(500).send('Verification failed.');
  }
});

// Update login to check verified
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userSnap = await USERS.where('email', '==', email).get();
    if (userSnap.empty) return res.status(400).json({ error: 'Invalid credentials' });
    const userDoc = userSnap.docs[0];
    const user = userDoc.data();
    if (!user.verified) return res.status(403).json({ error: 'Please verify your email before logging in.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, userName: user.userName || '', userId: userDoc.id });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});


// Reset password
router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userSnap = await USERS.where('email', '==', email).get();
    if (userSnap.empty) return res.status(404).json({ error: 'User not found' });
    const userDoc = userSnap.docs[0];
    const hash = await bcrypt.hash(password, 10);
    await USERS.doc(userDoc.id).update({ password: hash });
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;