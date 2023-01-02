const UserController = require('../controllers/users.controller.js');

const express = require('express');
const router = express.Router();

const userController = new UserController();
router.post('/', (req, res, next) => {
  console.log('로그인 라우터 진입');
  next();
}, userController.login);

module.exports = router;