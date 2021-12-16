const express = require('express');

const router = express.Router();

const registrationController = require('../controllers/registration.js');

router.get('/registration', registrationController.serveGet);

router.post('/registration', registrationController.servePost);

module.exports = router;