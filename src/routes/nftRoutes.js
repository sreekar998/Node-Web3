const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for NFT-related APIs
router.post('/', authMiddleware.authenticateUser, nftController.createNFT);
router.get('/:nftId', nftController.getNFT);

module.exports = router;
