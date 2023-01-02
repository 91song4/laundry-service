const LoginController = require('../controllers/login.controller.js');

const express = require('express');
const router = express.Router();

const loginController = new LoginController();
router.post('/', (req, res, next) => {
  console.log('로그인 라우터 진입');
  next();
}, loginController.login);

module.exports = router;