const express = require('express');
const userRoutes = require('./routes/userRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const nftRoutes = require('./routes/nftRoutes');
const galleryNftRoutes = require('./routes/galleryNftRoutes');
const userFollowRoutes = require('./routes/userFollowRoutes');
const galleryLikeRoutes = require('./routes/galleryLikeRoutes'); // Add this line
const galleryCommentRoutes = require('./routes/galleryCommentRoutes'); // Add this line

const app = express();

app.use(express.json());

// Use user, gallery, NFT, Gallery-NFT, User-Follower, Gallery Likes, and Gallery Comments routes
app.use('/api/users', userRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/nfts', nftRoutes);
app.use('/api/galleries', galleryNftRoutes);
app.use('/api/users', userFollowRoutes);
app.use('/api/galleries', galleryLikeRoutes); // Add this line
app.use('/api/galleries', galleryCommentRoutes); // Add this line

module.exports = app;
