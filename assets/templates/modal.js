const modal = document.querySelector('#modal');
const modal_close_btn = document.querySelector('#modal-close-btn');

const login_btn = document.querySelector('#login-btn');
const signup_btn = document.querySelector('#signup-btn');

const modal_content = document.querySelector('#modal-content');

signup_btn.addEventListener('click', (event) => {
  modalOn();
  const temp_html = `<div class="signin_form">
                       <div class="sign_email">
                          <input id="signForm"  placeholder="이메일" type="text">\
                       </div> 
                       <div class="sign_nick">
                          <input id="signForm"  placeholder="닉네임" type="text">\
                       </div>
                       <div class="sign_phone">
                          <input id="signForm"  placeholder="전화번호" type="text">\
                       </div>
                       <div class="sign_address">
                          <input id="signForm"  placeholder="주소" type="text">\
                       </div>
                       <div class="sign_pwd">
                          <input id="signForm"  placeholder="비밀번호" type="password">\
                       </div>
                       <div class="sign_repwd">
                          <input id="signForm"  placeholder="비밀번호 확인" type="password">\
                       </div>
                       <div class="sign_usertype">
                          <select class="form-select" aria-label="Default select example">                   
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
  })
})

login_btn.addEventListener('click', (event) => {
  modalOn();
  const temp_html = `<div class="login_form">
                      <div class="email_form">
                       <input placeholder="이메일" id="signForm" class="form-control" type="text">\
                      </div>
                      <div class="pw_form">
                        <input placeholder="비밀번호" id="signForm" class="form-control" type="password">\
                      </div> 
                     </div>
                    `;
  modal_content.innerHTML = temp_html;

  const new_login_btn = document.createElement('button');
  new_login_btn.setAttribute('id', 'login_btn')
  new_login_btn.textContent = '로그인';
  document.querySelector('.login_form').appendChild(new_login_btn);

  new_login_btn.addEventListener('click', async () => {
    const [email, pw] = document.querySelectorAll('.signForm');
    await axios.post('/api/login', {
      email: email.value,
      pw: pw.value,
    }).then((response) => {
      window.location.reload();
    }).catch((error) => {
      alert(error.request.response);
    })
  })
})

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