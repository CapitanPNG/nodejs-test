const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.js');

router.get('/login', loginController.serveGet);

router.post('/login', loginController.servePost);

module.exports = router;