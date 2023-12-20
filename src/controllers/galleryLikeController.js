const { GalleryLikes } = require('../../database/models');

module.exports = {
  likeUnlikeToggle: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const userId = req.user.id; // Assuming you have middleware to extract user from JWT

      console.log('Received User ID:', userId);
      
      // Check if the user has already liked the gallery
      const existingLike = await GalleryLikes.findOne({ where: { galleryId, userId } });

      if (existingLike) {
        // User has already liked the gallery, unlike it
        await existingLike.destroy();
        res.json({ message: 'Gallery unliked successfully' });
      } else {
        // User has not liked the gallery, like it
        await GalleryLikes.create({ galleryId, userId });
        res.json({ message: 'Gallery liked successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
