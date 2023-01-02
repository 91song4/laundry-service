const signupRouter = require('./signup.routes.js');
const loginRouter = require('./login.routes.js');
const reviewRouter = require('./review.routes.js');

const express = require('express');
const router = express();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/reviews', reviewRouter);

module.exports = router;