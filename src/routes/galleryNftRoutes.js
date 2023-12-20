const express = require('express');
const router = express.Router();
const galleryNftController = require('../controllers/galleryNftController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for Gallery-NFT Relationship APIs
router.post('/:galleryId/nfts', authMiddleware.authenticateUser, galleryNftController.addNFTToGallery);
router.delete('/nfts/:galleryNftId', authMiddleware.authenticateUser, galleryNftController.removeNFTFromGallery);

module.exports = router;
