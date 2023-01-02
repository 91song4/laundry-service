const AuthController = require('../controllers/auth.controller.js');

const express = require('express');
const router = express.Router();

const authController = new AuthController();
router.post('/', (req, res, next) => {
  console.log('로그인 라우터 진입');
  next();
}, authController.login);

module.exports = router;