const express = require('express');
const routes = express.Router();
const auth  = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer');

const AuthController = require('./app/controllers/AuthController');
const UsersController = require('./app/controllers/UsersController');
const PhotosController = require('./app/controllers/PhotosController');
const LikesController = require('./app/controllers/LikesController');

// Auth
routes.post('/auth/login', AuthController.login);
routes.post('/auth/register', AuthController.register);

// Users
routes.get('/users', auth, UsersController.index);

//Photos
routes.post('/photos/:user_id/store', multer(multerConfig).single('file'), PhotosController.store);
routes.get('/photos/:user_id', auth, PhotosController.index);

// Likes
routes.post('/likes', auth, LikesController.like);

module.exports = routes;