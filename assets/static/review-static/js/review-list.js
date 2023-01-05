$(document).ready(function () {
  show_review()
})
function show_review() {
  
  $.ajax({
    type: 'GET',
    url:'/api/reviews',
    success: function (response) {
      let rows = response['reviews']
      console.log(rows)
      for (let i = 0; i < rows.length; i++) {
        let nickname = rows[i]['customer'].name;
        console.log(nickname)
        let provider_id = rows[i]['provider'].name;
        let review_id = rows[i]['review_id'];
        let star = rows[i]['star'];       
        star = parseInt(star / 2)
        let output = ''
        for (let j = 0; j < star; j++) {
          output += '★'
        }
        let review = rows[i]['review']


        let temp_html = `
        <div class="review_list">
          <div class="review_head">
              img
          </div>
          <div class="review_body">
            <div class="review_name">
              ${nickname}
            </div>
            <div class="provider_name">
              ${provider_id}
            </div>
            <div class="review_rate">
              ${output}
            </div>
            <div class="review_content">
              ${review}
            </div>
          </div>
          <div class="review_tail">
            <button class="review_delete" onclick="delete_review(${review_id})">삭제</button>

          </div>
        </div>  
        `
        $('.body-wrap').append(temp_html)
      }
      
    }
    
  })
}

function delete_review(id) {
  // console.log(review_id)
  $.ajax({
    type: 'DELETE',
    url:`/api/reviews/${id}`,
    success: function (response) {
      window.location.reload();
    }
  })
}