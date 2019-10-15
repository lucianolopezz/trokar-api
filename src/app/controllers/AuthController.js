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
      
      const price = parseFloat(req.body.price.substring(0, req.body.price.indexOf(',')));
      const price_fipe = parseFloat(req.body.price_fipe.replace('R$', '').replace(',', '.'));   
      const total = (price + price_fipe) / 2;
      const price_medium = total - (2.5 * total / 100 );

      req.body.price = String(price.toFixed(3)).replace('.', '');
      req.body.price_fipe = String(price_fipe.toFixed(3)).replace('.', '');
      req.body.price_medium = String(price_medium.toFixed(3)).replace('.', '');
      req.body.km = req.body.km;

      const user = await Users.create(req.body);

      return res.json(user);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new Auth();