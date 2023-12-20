const { User, Gallery, UserFollowers, sequelize } = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ where: { username } });

      // If the user doesn't exist or the password is incorrect, return an error
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const secretKey = process.env.JWT_SECRET

      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const { Op } = require('sequelize');

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  getProfile: async (req, res) => {
    try {
      const identifier = req.params.identifier;

      const user = await User.findOne({
        where: {
          [sequelize.or]: [{ username: identifier }, { walletAddress: identifier }],
        },
        include: [
          { model: Gallery, attributes: ['id', 'title', 'description', 'coverPhoto'] },
          { model: User, as: 'followers', through: 'UserFollowers', attributes: ['id', 'username'] },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.params.userId;

    // Ensure that the user making the request is the same as the user whose profile is being updated
    if (req.user.id !== parseInt(userId, 10)) {
      return res.status(403).json({ message: 'Forbidden - You are not allowed to update this profile' });
    }

      const updatedProfile = req.body;

      await User.update(updatedProfile, { where: { id: userId } });

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const userId = req.user.id;

      // Assuming you are using multer to handle file uploads
      upload.single('avatar')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.error(err);
          return res.status(500).json({ message: 'Error during file upload' });
        } else if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        // At this point, req.file contains the uploaded avatar file
        const avatarPhotoBuffer = req.file.buffer;

        // Create a new entry in the Files table
        const fileEntry = await Files.create({
          file_name: 'avatar',
          file_type: req.file.mimetype,
          file_data: avatarPhotoBuffer,
          user_id: userId,
        });

        // Update the user's avatarPhoto field in the User table with the file ID
        await User.update({ avatarPhoto: fileEntry.id }, { where: { id: userId } });

        res.json({ message: 'Avatar uploaded successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  followUnfollow: async (req, res) => {
    try {
      const followerId = req.user.id; 
      const followeeId = req.params.followeeId;

      // Check if the follow relationship already exists
      const existingFollow = await UserFollowers.findOne({
        where: { followerId, followeeId },
      });

      if (existingFollow) {
        // If the relationship exists, unfollow the user
        await existingFollow.destroy();
        res.json({ message: 'User unfollowed successfully' });
      } else {
        // If the relationship does not exist, create a new follow relationship
        await UserFollowers.create({ followerId, followeeId });
        res.json({ message: 'User followed successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
