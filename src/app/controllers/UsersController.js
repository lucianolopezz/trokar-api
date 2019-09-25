const Sequelize = require('sequelize');
const { Users, Photos, Likes } = require('../models');
const Op = Sequelize.Op;

class UsersController {

  async index(req, res) {
    try {
      
      const users = await Users.findAll({
        where: {
          [Op.and]: [
            {id: { [Op.ne]: req.params.id }},
            {id: { [Op.notIn]: Sequelize.literal(`(SELECT user_target FROM likes WHERE user_source = ${req.params.id})`) }}
          ],
          active: true,
        },
        include: [Photos],
      });

      return res.json(users);

    } catch (error) {
      throw new Error(error);
    }
  }

  async matches(req, res) {
    try {
      
      const users = await Users.findAll({
        where: {
          [Op.and]: [
            {id: { [Op.ne]: req.params.id }},
            {id: { [Op.in]: Sequelize.literal(`(SELECT l.user_target FROM likes l WHERE l.user_source = ${req.params.id} AND l.like = true)`) }},            
            {id: { [Op.in]: Sequelize.literal(`(SELECT l.user_source FROM likes l WHERE l.user_target = ${req.params.id} AND l.like = true)`) }},            
          ],
          active: true,
        },
        include: [Photos],
      });

      return res.json(users);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new UsersController();