// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = {

  authenticateUser: (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1];

    console.log('Received Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key
      console.log('Decoded User:', decoded.user);
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized - Token verification failed' });
    }
  },
};
