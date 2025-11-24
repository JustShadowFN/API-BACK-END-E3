const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');

router.get('/', trainingController.getAllTrainings); 
router.post('/', trainingController.createTraining); 
router.put('/:id', trainingController.updateTraining); 
router.delete('/:id', trainingController.deleteTraining); 

router.get('/:id/details', trainingController.getWorkshopDetails); 
router.post('/:id/details', trainingController.createWorkshopDetails); 
router.put('/:id/details', trainingController.updateWorkshopDetails); 

module.exports = router;