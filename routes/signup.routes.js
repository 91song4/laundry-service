const SignupController = require('../controllers/signup.controller.js');

const express = require('express');
const router = express();

const signupController = new SignupController();
router.post('/', (req, res, next) => {
  console.log('회원가입 라우터 진입');
  next();
}, signupController.signup);

module.exports = router;