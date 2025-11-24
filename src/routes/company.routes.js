const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');

router.get('/', companyController.getAllCompanies); 
router.post('/', companyController.createCompany); 
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.get('/:id/sessions', auth, checkRole(['rh', 'admin']), companyController.getCompanySessions);

module.exports = router;