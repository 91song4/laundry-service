//유저가 신청한 세탁 확인
const GetrequestController = require('../controllers/getrequest.controller');
const AuthMiddleware = require('../controllers/auth.controller.js');
const express = require('express');
const router = express.Router();
const authMiddleware = new AuthMiddleware();
const getrequestController = new GetrequestController();
//신청한 세탁물 user_id에 맞는
router.get('/',(req,res,next)=>{
    console.log('잘들어가나routes?');
    next();
},authMiddleware.auth_middleware,getrequestController.getRequest);

module.exports = router;
