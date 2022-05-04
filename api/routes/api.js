/*
 * Api.js
 * @description
 * This file is used for storing all the routes related to the project.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const eventController = require('../controllers/eventController');
const shiftController = require('../controllers/shiftController');
const fetchController = require('../controllers/fetchController');
const User = require('../models/UserModels');


router.get('/ping', userController.sayHello)
router.get('/fetchDataFromApi', userController.fetchDataFromApi);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userListing', userController.fetchAllUsers);
router.post('/deactivateUser', userController.deactivateUser);
router.post('/activateUser', userController.activateUser);
// router.post('/updateRecord', userController.updateRecord);

router.post('/startShift', shiftController.startShift);
router.post('/endShift', shiftController.endShift), 

router.post('/fetchData', fetchController.getData);

// router.post('/fetchDataFromClover', fetchController.fetchPriceClover);
router.post('/fetchDataParticular', fetchController.fetchDataParticular );

router.post('/orderChecked', fetchController.orderChecked);
module.exports = router;