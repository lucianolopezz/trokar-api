const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Likes, Users, Photos } = require('../models');

class LikesController {

  async like(req, res) {
    try {
      
      const { user_source, user_target } = req.body;

      const user_source_like = await Likes.findOne({ where: { user_source, user_target, active: true } });

      if(user_source_like) return res.status(400).json({ error: 'user already liked' });            

      const like = await Likes.create(req.body);

      const usersMatch = await Likes.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        where: {
          [Op.or]: [
            {user_source, user_target},
            {user_target: user_source, user_source: user_target}
          ],
          liked: true,
          active: true,
        },
        raw: true,
      });

      if(usersMatch[0].count === 2) {
        const loggedSocket = req.connectedUsers[user_source];
        const targetSocket = req.connectedUsers[user_target];
        const userSource = await Users.findOne({ where: { id: user_source }, include: [Photos] });
        const userTarget = await Users.findOne({ where: { id: user_target }, include: [Photos] });

        if(loggedSocket) {
          req.io.to(loggedSocket).emit('match', userTarget);
        }

        if(targetSocket) {
          req.io.to(targetSocket).emit('match', userSource);
        }
      }

      return res.json(like);

    } catch (error) {
      throw new Error(error);
    }
  }

  async dislike(req, res) {
    try {
      
      const { user_source, user_target } = req.body;

      const user_source_dislike = await Likes.findOne({ where: { user_source, user_target, active: true } });

      let dislike;
      if(user_source_dislike) {
        dislike = await Likes.update({ liked: false }, { where: { user_source, user_target, active: true }});
        return res.json(dislike);
      };

      dislike = await Likes.create({
        user_source,
        user_target,
        liked: false,
      });

      return res.json(dislike);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new LikesController();