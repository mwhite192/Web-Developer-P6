// sets up express
const express = require('express'); 
// sets up router
const router = express.Router();

// sets up the user controller
const userCtrl = require('../controllers/user');

// sets up the routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// exports router for routes
module.exports = router;