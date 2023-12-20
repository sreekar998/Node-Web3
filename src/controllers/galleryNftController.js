const { GalleryNfts, Nfts, Gallery } = require('../../database/models');

module.exports = {
  addNFTToGallery: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const userId = req.user.id;
      const { tokenId, tokenAddress } = req.body;

      // Find the gallery and check if the user is the owner
      const gallery = await Gallery.findOne({ where: { id: galleryId, userId } });

      if (!gallery) {
        return res.status(403).json({ message: 'You do not have permission to add NFTs to this gallery' });
      }

      // Check if the NFT already exists in the database
      let nft = await Nfts.findOne({ where: { tokenId, tokenAddress } });

      // If the NFT does not exist, create a new entry
      if (!nft) {
        nft = await Nfts.create({
          tokenId,
          tokenAddress,
          // Additional metadata fields if needed
        });
      }

      // Add the NFT to the gallery
      const galleryNft = await GalleryNfts.create({
        galleryId,
        nftId: nft.id,
        description: req.body.description,
      });

      res.status(201).json({ message: 'NFT added to gallery successfully', galleryNft });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  removeNFTFromGallery: async (req, res) => {
    try {
      const galleryNftId = req.params.galleryNftId;
      const userId = req.user.id; 

      // Find the gallery-NFT relationship
      const galleryNft = await GalleryNfts.findOne({ where: { id: galleryNftId }, include: [Gallery] });

      if (!galleryNft || !galleryNft.Gallery || galleryNft.Gallery.userId !== userId) {
        return res.status(403).json({ message: 'You do not have permission to remove this NFT from the gallery' });
      }

      // Delete the gallery-NFT relationship
      await galleryNft.destroy();

      res.json({ message: 'NFT removed from gallery successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
