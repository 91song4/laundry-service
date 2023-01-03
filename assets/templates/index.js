const reserve_btn = document.querySelector('#reserve_btn');
const status_btn = document.querySelector('#status_btn');
const logout_btn = document.querySelector('#logout-btn');

reserve_btn.addEventListener('click', () => {
  window.location.href = '/api/request';
})

status_btn.addEventListener('click', () => {
  window.location.href = '/api/status';
})

logout_btn.addEventListener('click', () => {
  Cookies.remove('jwt');
  window.location.href = './index.html';
})