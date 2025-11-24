const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

router.get('/', sessionController.getAllSessions); 
router.post('/', sessionController.createSession); 
router.put('/:id', sessionController.updateSession); 
router.delete('/:id', sessionController.deleteSession); 

router.get('/:id/registrations', sessionController.getRegistrationsForSession); 
router.post('/:id/register', sessionController.registerEmployee); 
router.put('/registrations/:id', sessionController.updateRegistrationStatus); 

module.exports = router;