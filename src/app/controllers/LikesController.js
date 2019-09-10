const { Likes } = require('../models');

class LikesController {

  async like(req, res) {
    try {
      
      const { user_source, user_target } = req.body;

      const user_source_like = await Likes.findOne({ where: { user_source, user_target, active: true } });

      if(user_source_like) return res.status(400).json({ error: 'user already liked' });            

      const like = await Likes.create(req.body);

      const usersMatch = await Likes.findOne({ where: { user_source, user_target, user_target: user_source, user_source: user_target, active: true } });

      if(usersMatch) console.log('Match');

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
        dislike = await Likes.update({ like: false }, { where: { user_source, user_target, active: true }});
        return res.json(dislike);
      };

      dislike = await Likes.create({
        user_source,
        user_target,
        like: false,
      });

      return res.json(dislike);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new LikesController();