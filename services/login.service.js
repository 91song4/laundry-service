const LoginRepository = require('../repositories/login.repository.js');
const { user } = require('../models');

class LoginService {
  loginRepository = new LoginRepository(user);

  loginUser = async (email, pw) => {
    console.log('로그인 서비스 진입');
    const userData = await this.loginRepository.findUser(email);
    if (!userData) {
      return -1
    }
    if (userData.pw !== pw) {
      return -2
    }

    return userData;
  }
}

module.exports = LoginService;