const UserController = require('../controllers/users.controller.js');

const express = require('express');
const router = express();

const userController = new UserController();
router.post('/', (req, res, next) => {
  console.log('회원가입 라우터 진입');
  next();
}, userController.signup);

module.exports = router;