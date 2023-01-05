const logout_btn = document.querySelector('#logout-btn');

logout_btn.addEventListener('click', () => {
  Cookies.remove('jwt');
  window.location.href = '/';
})