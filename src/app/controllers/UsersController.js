const { Users } = require('../models');

class UsersController {

  async index(req, res) {
    try {
      
      const user = await Users.findAll({ where: { active: true } });

      if(!user) return res.status(400).json({ error: 'User not found' });

      return res.json(user);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new UsersController();