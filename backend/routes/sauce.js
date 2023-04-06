// sets up express
const express = require('express');
// sets up router
const router = express.Router();

// sets up the middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// sets up the sauce controller
const sauceCtrl = require('../controllers/sauce');

// sets up the routes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
  
// exports router for routes
module.exports = router;