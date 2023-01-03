const express = require('express');
const router = express.Router();
const { review, request_status } = require('../models');  // models 폴더에 review를 받아옴
const authMiddleware = require('../controllers/auth.contoller');

route.post('/:request_id', authMiddleware, async (req, res) => {
  const { user_id } = res.locals.user;
  const { review, star } = req.body;
  const { request_id } = req.params;
  const requset = await request_status.findByPk(request_id);

  const newRequest = await review.create({
    review: review,
    star: star,
    customer_id: user_id,
    provider_id: 'request.provider_id',
    photo: ult_raw.cast_to_raw('This is a bolb description')
  })
  return res.status(200).json({message:'리뷰 작성을 완료했습니다.'})
  
})



module.exports = router;