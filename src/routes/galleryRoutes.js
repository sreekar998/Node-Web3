const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:galleryId', galleryController.getGallery);

// Routes for gallery-related APIs
router.use(authMiddleware.authenticateUser);

router.post('/',  galleryController.createGallery);
router.put('/:galleryId', galleryController.updateGallery);
router.delete('/:galleryId', galleryController.deleteGallery);

module.exports = router;
