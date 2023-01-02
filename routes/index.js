const signupRouter = require('./signup.routes.js');
const loginRouter = require('./login.routes.js');

const express = require('express');
const router = express.Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

module.exports = router;