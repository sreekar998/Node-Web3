const { Gallery, Nfts, GalleryLikes, GalleryComments } = require('../../database/models');

module.exports = {
  createGallery: async (req, res) => {
    try {
      const userId = req.user.id;
      const { title, description, coverPhoto } = req.body;

      // Create a new gallery
      const newGallery = await Gallery.create({
        title,
        description,
        coverPhoto,
        userId,
      });

      res.status(201).json({ message: 'Gallery created successfully', gallery: newGallery });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getGallery: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;

      // Fetch gallery information, including its NFTs, likes, and comments
      const gallery = await Gallery.findOne({
        where: { id: galleryId },
        include: [
          { model: Nfts, attributes: ['id', 'title', 'description', 'tokenAddress', 'tokenId', 'metadataImage'] },
          { model: GalleryLikes, attributes: ['id', 'userId'] },
          {
            model: GalleryComments,
            attributes: ['id', 'userId', 'commentText', 'timestamp'],
            include: [{ model: User, attributes: ['id', 'username'] }],
          },
        ],
      });

      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }

      res.json(gallery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateGallery: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const userId = req.user.id; 
      const { title, description, coverPhoto } = req.body;

      // Check if the user is the owner of the gallery
      const gallery = await Gallery.findOne({ where: { id: galleryId, userId } });
      if (!gallery) {
        return res.status(403).json({ message: 'You do not have permission to update this gallery' });
      }

      // Update gallery information
      await gallery.update({ title, description, coverPhoto });

      res.json({ message: 'Gallery updated successfully', gallery });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteGallery: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const userId = req.user.id; 

      // Check if the user is the owner of the gallery
      const gallery = await Gallery.findOne({ where: { id: galleryId, userId } });
      if (!gallery) {
        return res.status(403).json({ message: 'You do not have permission to delete this gallery' });
      }

      // Delete the gallery
      await gallery.destroy();

      res.json({ message: 'Gallery deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
