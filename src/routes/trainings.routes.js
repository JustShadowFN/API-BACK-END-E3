const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');
const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');


router.get('/', trainingController.getAllTrainings); 
router.get('/:id/details', trainingController.getWorkshopDetails);


router.post('/', auth, checkRole(['admin']), trainingController.createTraining);
router.put('/:id', auth, checkRole(['admin']), trainingController.updateTraining);
router.delete('/:id', auth, checkRole(['admin']), trainingController.deleteTraining);
router.post('/:id/details', auth, checkRole(['admin']), trainingController.createWorkshopDetails);
router.put('/:id/details', auth, checkRole(['admin']), trainingController.updateWorkshopDetails);

module.exports = router;