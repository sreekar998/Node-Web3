const express = require('express');
const router = express.Router();
const userFollowController = require('../controllers/userFollowController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for User-Follower Relationship APIs
router.get('/:userId/followers', authMiddleware.authenticateUser, userFollowController.getFollowers);
router.get('/:userId/following', authMiddleware.authenticateUser, userFollowController.getFollowing);

module.exports = router;
