const express = require('express');
const router = express.Router();
const galleryCommentController = require('../controllers/galleryCommentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for Gallery Comments APIs
router.post('/:galleryId/comments', authMiddleware.authenticateUser, galleryCommentController.addComment);
router.put('/:galleryId/comments/:commentId', authMiddleware.authenticateUser, galleryCommentController.updateComment);
router.delete('/:galleryId/comments/:commentId', authMiddleware.authenticateUser, galleryCommentController.deleteComment);

module.exports = router;
