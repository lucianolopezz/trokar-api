const { ExchangePreferences } = require('../models');

class ExchangePreferencesController {

  async index(req, res) {
    try {
      
      const preferences = await ExchangePreferences.findAll({ attributes: [['id', 'value'], 'name'] });

      return res.json(preferences);

    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new ExchangePreferencesController();