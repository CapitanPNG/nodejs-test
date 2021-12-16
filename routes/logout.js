const express = require('express');

const router = express.Router();

const logoutController = require('../controllers/logout.js');

router.get('/logout', logoutController.serveGet);

module.exports = router;