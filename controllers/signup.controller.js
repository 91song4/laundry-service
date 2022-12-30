const SignupService = require('../services/signup.service.js');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res, next) => {
    console.log('컨트롤러 진입');
    const { email, name, phone, address, pw, confirm, user_type } = req.body;
    const point = user_type ? 10000 : 0;
    console.log(point);
    const createUserData = await this.signupService.createUser(email, name, phone, address, pw, user_type, point);
    res.status(201).json({ message: `회원 가입에 성공하였습니다. ${point}point` });
  }
}

module.exports = SignupController;