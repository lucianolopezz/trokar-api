const { Users } = require('../models');

class Auth {

  async login(req, res) {
    try {

      const { phone } = req.body;
      
      const user = await Users.findOne({ where: { phone, active: true } });

      if(!user) return res.status(400).json({ error: 'User not found' });

      return res.json(user);

    } catch (error) {
      throw new Error(error);
    }
  }

  async register(req, res) {
    try {

      const { phone } = req.body;
      
      const userExists = await Users.findOne({ where: { phone } });

      if(userExists) return res.status(400).json({ 'error': 'user already exists'});

      const user = await Users.create(req.body);

      return res.json(user);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new Auth();