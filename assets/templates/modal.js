const modal = document.querySelector('#modal');
const modal_close_btn = document.querySelector('#modal-close-btn');

const login_btn = document.querySelector('#login-btn');
const signup_btn = document.querySelector('#signup-btn');

const modal_content = document.querySelector('#modal-content');

signup_btn.addEventListener('click', (event) => {
  modalOn();
  const temp_html = '\
                      <p>email<input class="signForm" type="text"></p>\
                      <p>nickname<input class="signForm" type="text"></p>\
                      <p>phone<input class="signForm" type="text"></p>\
                      <p>address<input class="signForm" type="text"></p>\
                      <p>pw<input class="signForm" type="password"></p>\
                      <p>confirm<input class="signForm" type="password"></p>\
                      <p>userType<input class="signForm" type="password"></p>\
                    ';

  modal_content.innerHTML = temp_html;

  const new_signup_btn = document.createElement('button');
  new_signup_btn.textContent = '회원가입';
  modal_content.appendChild(new_signup_btn);

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
  const temp_html = `
                      <p>email<input class="signForm" type="text"></p>\
                      <p>pw<input class="signForm" type="password"></p>\
                    `;
  modal_content.innerHTML = temp_html;

  const new_login_btn = document.createElement('button');
  new_login_btn.textContent = '로그인';
  modal_content.appendChild(new_login_btn);

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