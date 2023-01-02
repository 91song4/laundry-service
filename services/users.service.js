const UserRepository = require('../repositories/users.repository.js');
const { user } = require('../models');

class UserService {
  userRepository = new UserRepository(user);

  createUser = async (email, name, phone, address, pw, user_type, point) => {
    console.log('회원가입 서비스 진입');
    const userData = await this.userRepository.createUser(email, name, phone, address, pw, user_type, point)
    console.log('userData@', userData);
    if (userData !== 1) {
      return userData;
    }

    // console.log('서비스 퇴장');
    return 1;
  }

  loginUser = async (email, pw) => {
    console.log('로그인 서비스 진입');
    console.log(email);
    const userData = await this.userRepository.findUser(email);
    if (!userData) {
      return -1
    }
    if (userData.pw !== pw) {
      return -2
    }

    return userData;
  }

  findIdUser = async (userId) => {
    const userData = await this.userRepository.findId(userId);
    if (!userData) {
      return -1
    }
    
    return userData.dataValues;
  }
}

module.exports = UserService;