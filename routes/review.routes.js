const express = require('express');
const router = express.Router();
const { review, request_status } = require('../models');  // models 폴더에 review를 받아옴
const AuthController = require('../controllers/auth.controller.js');
const authMiddleware = new AuthController();

// 리뷰 작성
router.post('/:request_id', authMiddleware.auth_middleware, async (req, res) => {
  const { user_id } = res.locals.user;
  const { review, star } = req.body;
  const { request_id } = req.params;
  const request = await request_status.findByPk(request_id);

  const newRequest = await review.create({
    review: review,
    star: star,
    customer_id: user_id,
    provider_id: request.provider_id,
    photo: ult_raw.cast_to_raw('This is a blob description')
  })
  return res.status(200).json({message:'리뷰 작성을 완료했습니다.'})
  
})

// 리뷰 삭제
router.delete('/:review_id', authMiddleware.auth_middleware, async (req, res) => {
  const { review_id } = req.params;
  const { user_id } = res.locals.user;

  const deleteReview = await review.findByPk({ review_id });
  // review_id에 해당하는 리뷰 글이 없는 경우 에러 메세지
  if (!deleteReview) {
    return res.status(404).json({
      errorMessage: '리뷰글을 찾지 못했습니다.'
    });
  }

  // 리뷰 글은 존재하나 작성자 본인이 아닌 경우
  if (user_id !== deleteReview.customer_id) {
    return res.status(401).json({
      errorMessage: '작성자 본인만 삭제 가능합니다.'
    });
  }
  // 작성자 본인이 맞는 경우, 삭제 진행
  await deleteReview.destroy();
  return res.status(200).json({
    message: '리뷰를 삭제하였습니다.'
  })
})


module.exports = router;