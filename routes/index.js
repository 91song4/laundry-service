const signupRouter = require('./signup.routes.js');
const loginRouter = require('./login.routes.js');
const reviewRouter = require('./review.routes.js');
const getallRouter = require('./getall.routes.js');
const requestRouterh = require('./request.routes.js');
const getrequestRouter = require('./getrequest.routes.js');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: false})),
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/reviews', reviewRouter);
router.use('/status', getallRouter);
router.use('/request', requestRouterh);
router.use('/statusone',getrequestRouter);
module.exports = router;