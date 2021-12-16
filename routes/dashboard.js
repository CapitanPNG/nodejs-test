const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/dashboard.js');

const nocache = require('nocache');

router.use('/dashboard', nocache());

router.get('/dashboard', dashboardController.serveGet);

module.exports = router;