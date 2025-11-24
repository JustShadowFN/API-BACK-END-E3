const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validate, authSchema } = require('../middlewares/validators');

router.post('/register', validate(authSchema), authController.register);
router.post('/login', validate(authSchema), authController.login);

module.exports = router;