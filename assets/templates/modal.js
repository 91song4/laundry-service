// 쿠키에 값이 있을 경우
if (document.URL.includes('main.login.html')) {
  if (!isCookie()) {
    window.location.replace('/');
  }
} else {
  if (isCookie()) {
    window.location.replace('main.login.html');
  }
}

const modal = document.querySelector('#modal');
const modal_close_btn = document.querySelector('#modal-close-btn');
const modal_content = document.querySelector('#modal-content');

// 모달창 닫기 - 외부영역 클릭
modal.addEventListener('click', (event) => {
  const evTarget = event.target
  if (evTarget.classList.contains("modal-overlay")) {
    modalOff();
  }
})

// 모달창 닫기 - esc
window.addEventListener("keyup", event => {
  if (isModal() && event.key === "Escape") {
    modalOff();
  }
})

// 모달창 닫기 - x버튼 누르기
modal_close_btn.addEventListener('click', (event) => {
  modalOff();
})


function modalOn() {
  modal.style.display = 'flex';
}

function modalOff() {
  modal.style.display = 'none';
}

function isModal() {
  return modal.style.display === 'flex';
}

function isCookie() {
  if (document.cookie.length < 1)
    return 0;
  return 1;
}

const login_btn = document.querySelector('#login-btn');
const signup_btn = document.querySelector('#signup-btn');
const reserve_btn = document.querySelector('#reserve_btn');


reserve_btn.addEventListener('click', () => {
  if (!isCookie()) {
    login_btn.click();
  } else {
    modalOn();
    const temp_html = `
                        <div class="signin_form">
                          <div class="sign_nick">
                          <input class="signForm" id="first_input" placeholder="닉네임" type="text">
                        </div>
                        <div class="sign_phone">
                          <input class="signForm"  placeholder="전화번호" type="text">
                        </div>
                        <div class="sign_address">
                          <input class="signForm"  placeholder="주소" type="text">
                        </div>
                        <div class="sign_pwd">
                          <input class="signForm"  placeholder="요청사항" type="text">
                        </div>
                        <aside>
                          <p><strong>세탁물 이미지</strong></p>
                          <img id="profile-img" width="125;" src="../static/request-static/image/default.png" class="rounded float-start">
                          <div>
                            <input style="display:none" id="upload-btn" type="file" name="photo" accept="image/*" />
                          </div>
                        </aside>
                       `;

    modal_content.innerHTML = temp_html;

    const request_btn = document.createElement('button');
    request_btn.setAttribute('id', 'request_btn')
    request_btn.textContent = '등록하기';
    document.querySelector('.signin_form').appendChild(request_btn);
    document.querySelector('#first_input').focus();

    //이미지 업로드
    const upload_btn = document.querySelector('#upload-btn');
    const image_btn = document.querySelector('#profile-img');
    // const submit_btn = document.querySelector('#submit-btn');
    image_btn.addEventListener('click', () => { upload_btn.click() });
    // upload_btn.addEventListener('change', () => { submit_btn.click(); });
    request_btn.addEventListener('click', async () => {
      const [name, phone, address, request_details] = document.querySelectorAll('.signForm');
      const frm = new FormData();

      frm.append('name', name.value);
      frm.append('phone', phone.value);
      frm.append('address', address.value);
      frm.append('request_details', request_details.value);
      frm.append('photo', upload_btn.files[0]);
      // frm.append({
      //   name: name.value,
      //   phone: phone.value,
      //   address: address.value,
      //   request_detail: request_detail.value,
      //   photo:upload_btn.files
      // })
      axios.post('/api/request', frm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      ).then((response) => {
        console.log(response);
        // window.location.reload();
      }).catch((error) => {
        alert('??????????????????');
        alert(error.request.response);
      })
    })
  }
});

signup_btn.addEventListener('click', (event) => {
  modalOn();
  const temp_html = `<div class="signin_form">
                       <div class="sign_email">
                          <input class="signForm"  id="first_input" placeholder="이메일" type="text">\
                       </div> 
                       <div class="sign_nick">
                          <input class="signForm"  placeholder="닉네임" type="text">\
                       </div>
                       <div class="sign_phone">
                          <input class="signForm"  placeholder="전화번호" type="text">\
                       </div>
                       <div class="sign_address">
                          <input class="signForm"  placeholder="주소" type="text">\
                       </div>
                       <div class="sign_pwd">
                          <input class="signForm"  placeholder="비밀번호" type="password">\
                       </div>
                       <div class="sign_repwd">
                          <input class="signForm"  placeholder="비밀번호 확인" type="password">\
                       </div>
                       <div class="sign_usertype">
                          <select class="form-select signForm" aria-label="Default select example">                   
                          <option selected value="0">사장님</option>
                          <option value="1">고객</option>\
                          </select>
                       </div>                                        
                    `;

  modal_content.innerHTML = temp_html;

  const new_signup_btn = document.createElement('button');
  new_signup_btn.setAttribute('id', 'signin_btn')
  new_signup_btn.textContent = '회원가입';
  document.querySelector('.signin_form').appendChild(new_signup_btn);
  document.querySelector('#first_input').focus();

  new_signup_btn.addEventListener('click', async () => {
    const [email, name, phone, address, pw, confirm, userType] = document.querySelectorAll('.signForm');

    await axios.post('/api/signup', {
      email: email.value,
      name: name.value,
      phone: phone.value,
      address: address.value,
      pw: pw.value,
      confirm: confirm.value,
      user_type: userType.value
    }).then((response) => {
      window.location.reload();
    }).catch((error) => {
      alert(error.request.response);
    })
  });
})

login_btn.addEventListener('click', (event) => {
  modalOn();
  const temp_html = `<div class="login_form">
                      <div class="email_form">
                       <input placeholder="이메일" id="first_input" class="signForm"  type="text">\
                      </div>
                      <div class="pw_form">
                        <input placeholder="비밀번호" id="pw-input" class="signForm"  type="password">\
                      </div> 
                     </div>
                    `;
  modal_content.innerHTML = temp_html;

  const pw_input = document.querySelector('#pw-input');
  const new_login_btn = document.createElement('button');
  new_login_btn.setAttribute('id', 'login_btn')
  new_login_btn.textContent = '로그인';
  document.querySelector('.login_form').appendChild(new_login_btn);
  document.querySelector('#first_input').focus();
  new_login_btn.addEventListener('click', async () => {
    const [email, pw] = document.querySelectorAll('.signForm');
    await axios.post('/api/login', {
      email: email.value,
      pw: pw.value,
    }).then((response) => {
      window.location.href = './main.login.html';
    }).catch((error) => {
      alert(error.request.response);
    })
  })

  pw_input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      new_login_btn.click();
    }
  })

})
