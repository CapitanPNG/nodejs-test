const express = require('express');

const router = express.Router();

const usersManagementController = require('../controllers/users-management.js');

router.get('/users-management', usersManagementController.serveGet);
router.get('/users-management/:id', usersManagementController.serveGetParams);

router.put('/users-management/:id', usersManagementController.servePutParams);

router.delete('/users-management/:id', usersManagementController.serveDeleteParams);

module.exports = router;