const { User, UserFollowers } = require('../../database/models');

module.exports = {
  getFollowers: async (req, res) => {
    try {
      const userId = req.params.userId;
      const followers = await User.findAll({
        attributes: ['id', 'username'],
        include: [
          {
            model: User,
            as: 'followers',
            through: { model: UserFollowers, where: { followeeId: userId } },
            attributes: [],
          },
        ],
      });

      res.json(followers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getFollowing: async (req, res) => {
    try {
      const userId = req.params.userId;
      const following = await User.findAll({
        attributes: ['id', 'username'],
        include: [
          {
            model: User,
            as: 'following',
            through: { model: UserFollowers, where: { followerId: userId } },
            attributes: [],
          },
        ],
      });

      res.json(following);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
