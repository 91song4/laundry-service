const express = require('express');
const router = express.Router();

const GetallController = require('../controllers/getall.controller');
const getallController = new GetallController();
//신청한 세탁물 모두
router.get('/status',getallController.getRequireStatus);
router.put('/status/:request_id',getallController.updateRequireStatus);

module.exports = router;
