const { Nfts, NftOwners } = require('../../database/models');
const axios = require('axios');
const { Network, Alchemy } = require("alchemy-sdk");
const { config } = require('dotenv');

config();

module.exports = {
  createNFT: async (req, res) => {
    try {
      const userId = req.user.id; 
      const { tokenId, tokenAddress } = req.body;

      // Fetching NFT metadata from external API
      const nftMetadata = await fetchNFTMetadata(tokenId, tokenAddress);

      // Create a new NFT entry in the database
      const newNFT = await Nfts.create({
        title: nftMetadata.title,
        description: nftMetadata.description,
        tokenAddress,
        tokenId,
        chainId: nftMetadata.chainId,
        metadataImage: nftMetadata.metadataImage,
      });

      await NftOwners.create({
        nftId: newNFT.id,
        address: nftMetadata.ownerAddress,
        amount: 1, 
      });

      res.status(201).json({ message: 'NFT created successfully', nft: newNFT });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getNFT: async (req, res) => {
    try {
      const nftId = req.params.nftId;

      // Fetch NFT information, including its metadata image
      const nft = await Nfts.findOne({ where: { id: nftId } });

      if (!nft) {
        return res.status(404).json({ message: 'NFT not found' });
      }

      res.json(nft);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

const settings = {
  apiKey: process.env.API,
  network: Network.ETH_MAINNET, 
};

const alchemy = new Alchemy(settings);

const fetchNFTMetadata = async (tokenId, tokenAddress) => {
  const response = await alchemy.nft.getNftMetadata(
    nftContractAddress,
    tokenId
  );
  return response;
};
