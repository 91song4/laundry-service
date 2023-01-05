// const { template } = require("@babel/core");
// const { listen } = require("engine.io");

const drawStar = (target) => {
document.querySelector(`.star span`).style.width = `${target.value * 10}%`;

}
 

function create_review() {
  const star = $('.star_rate').val();
  // file,
  const content =  $('#review_content').val();
  console.log(star, content)

  $.ajax({
    type: 'POST',
    url:`/api/reviews/6`,
    data: {
      star: star,
      review2: content
    },
    dataType: 'json',
     // 완료 시 페이지 이동
    success: function (response) {
        window.location.replace('../../../templates/review-list.html');
     }
  });
}