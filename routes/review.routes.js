const express = require('express');
const router = express.Router();
const { review, request_status } = require('../models');  // models 폴더에 review를 받아옴
const authMiddleware = require('../controllers/auth.controller.js');

// 리뷰 작성
router.post('/:request_id', async (req, res) => {
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

// 리뷰 수정
router.put('/:review_id', async (req, res) => {
  const review_id = req.params;
  const { customer_id, provider_id, review, star, photo } = req.body;

  const modifyReview = await review.find({review_id});
  if (modifyReview.length) {
    await review.updateOne(
      { review_id: review_id },
      {
        $set: {
          review: review,
          star: star,
          photo:photo
        },
      },
    );
  }
  res.status(200).json({ success: true });

})

// 리뷰 삭제
router.delete('/:review_id', async (req, res) => {
  const { review_id } = req.params;

  const deleteReview = await review.find({ review_id });
  if (deleteReview.length) {
    await review.deleteOne({ review_id });
  }
  res.json({ result: 'success' })
})



module.exports = router;