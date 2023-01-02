const SignupRepository = require('../repositories/signup.repository.js');
const { user } = require('../models');

class SignupService {
  signupRepository = new SignupRepository(user);

  createUser = async (email, name, phone, address, pw, user_type, point) => {
    console.log('서비스 진입');
    return await this.signupRepository.createUser(email, name, phone, address, pw, user_type, point)
    // console.log('서비스 퇴장');
    // return createUserData;
  }
}

module.exports = SignupService;