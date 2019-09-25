const { Photos } = require('../models');

class PhotosController {

  async store(req, res) {
    try {

      const { originalname: name, size, filename: key,  } = req.file;
      const photo = await Photos.create({
        user_id: req.params.user_id,
        name,
        size,
        key,
        url: `${req.protocol}://${req.get('host')}/uploads/${key}`,
      });

      return res.json(photo);

    } catch (error) {
      throw new Error(error);
    }
  }

  async index(req, res) {
    try {

      const photos = await Photos.findAll({ where: { active: true, user_id: req.params.user_id } });

      return res.json(photos);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(req, res) {
    try {
      
      const photo = await Photos.destroy({ where: { id: req.params.id } });

      return res.json(photo);
    } catch (error) {
      throw new Error(error);
    }
  }

}

module.exports = new PhotosController();