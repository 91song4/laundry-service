const drawStar = (target) => {
document.querySelector(`.star span`).style.width = `${target.value * 10}%`;

}
 

function create_review(review_id) {
  const star = $('.star_rate').val();
  // file,
  const content =  $('#review_content').val();
  console.log(star, content)

  $.ajax({
    type: 'POST',
    url:`/api/reviews/${review_id}`,
    data: {
      star: star,
      review2: content
    },
    dataType: 'json',
    // success:
  });
}