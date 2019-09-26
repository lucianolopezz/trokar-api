const express = require('express');
const routes = express.Router();
const auth  = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer');

const AuthController = require('./app/controllers/AuthController');
const UsersController = require('./app/controllers/UsersController');
const PhotosController = require('./app/controllers/PhotosController');
const LikesController = require('./app/controllers/LikesController');
const ExchangePreferencesController = require('./app/controllers/ExchangePreferencesController');

// Auth
routes.post('/auth/login', AuthController.login);
routes.post('/auth/register', AuthController.register);

// Users
routes.get('/users/:id', auth, UsersController.index);
routes.get('/users/:id/matches', auth, UsersController.matches);
routes.get('/users/view/:id', auth, UsersController.matches);

//Photos
routes.post('/photos/:user_id/store', multer(multerConfig).single('file'), PhotosController.store);
routes.delete('/photos/:id', auth, PhotosController.delete);
routes.get('/photos/:user_id', auth, PhotosController.index);

// Likes
routes.post('/like', auth, LikesController.like);
routes.post('/dislike', auth, LikesController.dislike);

// exchange preferences
routes.get('/exchange_preferences', auth, ExchangePreferencesController.index);

module.exports = routes;