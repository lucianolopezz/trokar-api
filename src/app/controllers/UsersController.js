const Sequelize = require('sequelize');
const { Users, Photos } = require('../models');
const Op = Sequelize.Op;

class UsersController {

  async index(req, res) {
    let users = [];    

    try {

      users = await Users.findAll({
        where: {
          [Op.and]: [
            {id: { [Op.ne]: req.params.id }},
            {id: { [Op.notIn]: Sequelize.literal(`(SELECT user_target FROM likes WHERE user_source = ${req.params.id})`) }},
            {model: req.query.model},
            {year: req.query.year},
          ],
          active: true,
        },
        include: [Photos],
      });
      
      if(!users) {
        users = await Users.findAll({
          where: {
            [Op.and]: [
              {id: { [Op.ne]: req.params.id }},
              {id: { [Op.notIn]: Sequelize.literal(`(SELECT user_target FROM likes WHERE user_source = ${req.params.id})`) }}
            ],
            active: true,
          },
          include: [Photos],
        });
      }

      return res.json(users);

    } catch (error) {
      throw new Error(error);
    }
  }

  async view(req, res) {
    try {
      
      const user = await Users.findOne({
        where: {
          id: req.params.id,
          active: true,
        },
        include: [Photos],
      });

      return res.json(user);

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
            {id: { [Op.in]: Sequelize.literal(`(SELECT l.user_target FROM likes l WHERE l.user_source = ${req.params.id} AND l.liked = true)`) }},            
            {id: { [Op.in]: Sequelize.literal(`(SELECT l.user_source FROM likes l WHERE l.user_target = ${req.params.id} AND l.liked = true)`) }},            
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