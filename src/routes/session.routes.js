const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const { validate, sessionSchema } = require('../middlewares/validators');

router.get('/', auth, sessionController.getAllSessions); 
router.post('/', auth, checkRole(['trainer']), validate(sessionSchema), sessionController.createSession);
router.put('/:id', auth, checkRole(['trainer', 'admin']), sessionController.updateSession);
router.delete('/:id', auth, checkRole(['trainer', 'admin']), sessionController.deleteSession);

router.get('/:id/registrations', auth, checkRole(['rh', 'admin']), sessionController.getRegistrationsForSession);
router.post('/:id/register', auth, checkRole(['user', 'rh', 'admin']), sessionController.registerEmployee);
router.put('/registrations/:id', auth, checkRole(['rh', 'admin']), sessionController.updateRegistrationStatus);

module.exports = router;