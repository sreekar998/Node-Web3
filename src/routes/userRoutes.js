const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for user-related APIs
router.post('/login', userController.login);
router.post('/register', userController.register);

router.use(authMiddleware.authenticateUser); // Middleware for authentication

router.get('/profile/:identifier', userController.getProfile);
router.put('/profile/:userId', userController.updateProfile);
router.post('/avatar', userController.uploadAvatar);
router.post('/follow/:followeeId', userController.followUnfollow);

module.exports = router;
