const express = require('express');
const router = express.Router();

const trainingRoutes = require('./trainings.routes');
const sessionRoutes = require('./session.routes');
const companyRoutes = require('./company.routes');

router.use('/trainings', trainingRoutes);
router.use('/sessions', sessionRoutes);
router.use('/companies', companyRoutes);

module.exports = router;