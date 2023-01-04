const GetallController = require('../controllers/getall.controller');

const express = require('express');
const AuthMiddleware = require('../controllers/auth.controller.js');
const router = express.Router();
const authMiddleware = new AuthMiddleware();
const getallController = new GetallController();
//신청한 세탁물 모두,authMiddleware
router.get('/',(req,res,next)=>{
    console.log('잘들어가나?');
    next();
},getallController.getRequireStatus);
router.put('/:request_id',authMiddleware.auth_middleware,getallController.updateRequireStatus);

module.exports = router;
