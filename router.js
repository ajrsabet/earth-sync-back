const express = require('express');
const router = express.Router();

// Import all entity route files
const productsRoutes = require('./routes/products');
const processesRoutes = require('./routes/processes');
const impactsRoutes = require('./routes/impacts');
const conditionsRoutes = require('./routes/conditions');
const mediaRoutes = require('./routes/media');
const usersRoutes = require('./routes/users');
const susScoreRoutes = require('./routes/sustainabilityScrore');
const editsRoutes = require('./routes/edits');
const reviewsRoutes = require('./routes/reviews');
const paymentsRoutes = require('./routes/payments');

// Mount each entity router
router.use('/products', productsRoutes);
router.use('/processes', processesRoutes);
router.use('/impacts', impactsRoutes);
router.use('/conditions', conditionsRoutes);
router.use('/media', mediaRoutes);
router.use('/users', usersRoutes);
router.use('/sustainabilityScore', susScoreRoutes);
router.use('/edits', editsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/payments', paymentsRoutes);

module.exports = router;