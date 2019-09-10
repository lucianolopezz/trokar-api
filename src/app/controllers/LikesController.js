const { Likes } = require('../models');

class LikesController {

  async like(req, res) {
    try {
      
      const { user_source, user_target } = req.body;

      const user_source_liked = await Likes.findOne({ where: { user_source, user_target, active: true } });

      if(user_source_liked) return res.status(400).json({ error: 'user already liked' });            

      const like = await Likes.create(req.body);

      const usersMatch = await Likes.findOne({ where: { user_source, user_target, user_target: user_source, user_source: user_target, active: true } });

      if(usersMatch) console.log('Match');

      return res.json(like);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new LikesController();