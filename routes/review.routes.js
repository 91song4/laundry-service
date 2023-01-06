const express = require('express');
const router = express.Router();
const { review, request_status, user } = require('../models');  // models 폴더에 review를 받아옴
const AuthController = require('../controllers/auth.controller.js');
const { where } = require('sequelize');
// const user = require('../models/user');
const authMiddleware = new AuthController();


// 리뷰 조회
router.get('/', async (req, res) => {
  const reviews = await review.findAll({
    order: [['created_At', 'DESC']],
    include: [{model:user, attributes:['name'], as: 'provider'}, {model:user, attributes:['name'], as: 'customer'}]
  }); 
  res.send({reviews})
})


// 리뷰 작성
router.post('/:post_id', authMiddleware.auth_middleware, async (req, res) => {

  let { post_id } = req.params;
  post_id = Number(post_id);
  const { user_id } = res.locals.user;
  //console.log(res.locals.user.user_id)
  const { star, review2 } = req.body;
  // console.log(user_id);
  const result = await request_status.findByPk(post_id)
  console.log(result.provider_id)

  //  const createReview = await review.findByPk

   const newRequest = await review.create({
     review: review2,
     star: star,
     customer_id: user_id,
     provider_id: result.provider_id,
     request_id: post_id,
   })
   return res.status(200).json({message:'리뷰 작성을 완료했습니다.'})

 })

// 리뷰 삭제
router.delete('/:id', authMiddleware.auth_middleware, async (req, res) => {
  let { id } = req.params;
  
   const { user_id } = res.locals.user;
   

   const deleteReview = await review.findByPk(id);
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
  await review.destroy({
    where: {review_id: id}
  });
  return res.status(200).json({
    message: '리뷰를 삭제하였습니다.'
  })
})


module.exports = router;