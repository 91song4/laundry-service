const GetallController = require('../controllers/getall.controller');

const express = require('express');
const router = express.Router();

const getallController = new GetallController();
//신청한 세탁물 모두
router.get('/',(req,res,next)=>{
    console.log('잘들어가나?');
    next();
},getallController.getRequireStatus);
router.put('/:request_id',getallController.updateRequireStatus);

module.exports = router;