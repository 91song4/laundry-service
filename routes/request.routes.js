const AuthController = require('../controllers/auth.controller.js');
const RequestController = require('../controllers/request.controller.js');

const express = require('express');
const router = express.Router();

const requestController = new RequestController();
const authController = new AuthController();

router.post('/', authController.auth_middleware, requestController.createRequest);

module.exports = router;