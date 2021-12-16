const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile.js');

router.get('/profile', profileController.serveGet);

router.put('/profile', profileController.servePut);

router.delete('/profile', profileController.serveDelete);

module.exports = router;