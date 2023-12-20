const express = require('express');
const router = express.Router();
const galleryLikeController = require('../controllers/galleryLikeController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for Gallery Likes APIs
router.post('/:galleryId/likeUnlikeToggle', authMiddleware.authenticateUser, galleryLikeController.likeUnlikeToggle);

module.exports = router;
