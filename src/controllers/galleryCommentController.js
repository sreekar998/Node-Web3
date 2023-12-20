const { GalleryComments } = require('../../database/models');

module.exports = {
  addComment: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const userId = req.user.id; 
      const { commentText } = req.body;

      // Add a new comment to the gallery
      const newComment = await GalleryComments.create({
        galleryId,
        userId,
        commentText,
        timestamp: new Date(),
      });

      res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateComment: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const commentId = req.params.commentId;
      const userId = req.user.id; 
      const { commentText } = req.body;

      // Find the comment and check if the user is the owner
      const comment = await GalleryComments.findOne({ where: { id: commentId, userId, galleryId } });

      if (!comment) {
        return res.status(403).json({ message: 'You do not have permission to update this comment' });
      }

      // Update the comment
      await comment.update({ commentText });

      res.json({ message: 'Comment updated successfully', comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const galleryId = req.params.galleryId;
      const commentId = req.params.commentId;
      const userId = req.user.id;

      // Find the comment and check if the user is the owner
      const comment = await GalleryComments.findOne({ where: { id: commentId, userId, galleryId } });

      if (!comment) {
        return res.status(403).json({ message: 'You do not have permission to delete this comment' });
      }

      // Delete the comment
      await comment.destroy();

      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
