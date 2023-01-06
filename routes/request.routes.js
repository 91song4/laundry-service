const multer = require('multer')({ dest: 'assets/static/request-static/image/' });
// const multer = require('multer')({ dest: 'upload/' });

const AuthController = require('../controllers/auth.controller.js');
const RequestController = require('../controllers/request.controller.js');

const express = require('express');
const router = express.Router();

const requestController = new RequestController();
const authController = new AuthController();

router.post('/', authController.auth_middleware, multer.single('photo'), requestController.createRequest);

router.get('/', authController.auth_middleware, multer.single('photo'), requestController.getRequests);

module.exports = router;