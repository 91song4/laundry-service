$(document).ready(function () {
    show_review()
  })
  function show_review() {
    
    $.ajax({
      type: 'GET',
      url:`/api/request/${id}`,
      success: function (response) {
        let rows = response['reviews']
        console.log(rows)
        for (let i = 0; i < rows.length; i++) {
          let nickname = rows[i]['customer'].name;
          console.log(nickname)
          
  
  
          let temp_html = `
             <div class="review_list">
                  <div class="review_body">
                      <div class="review_name">
                        ${nickname}고객님
                      </div>
                      <div class="provider_name">
                        ${provider_id}사장님의 세탁소
                      </div>
                      <div class="review_rate">
                        ${output}
                      </div>
                      <div class="review_content">
                        ${review}
                      </div>
                  </div>
                  
                    <button class="review_delete" onclick="delete_review(${review_id})">삭제</button>
                  
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