const jwt = require('jsonwebtoken');

const LoginService = require('../services/login.service.js');

class LoginController {
  loginService = new LoginService();

  login = async (req, res) => {
    console.log('로그인 컨트롤러 진입');
    const { email, pw } = req.body;
    const userData = await this.loginService.loginUser(email, pw);

    if (userData === -1) {
      res.status(400).json({ errorMessage: "아이디가 없습니다." });
    } else if (userData === -2) {
      res.status(400).json({ errorMessage: "비밀번호가 틀립니다." });
    }

    const token = jwt.sign({ user_id: userData.user_id }, 'temp secret key', {
      expiresIn: "1m",  // 토큰 유효 기간
    })
    
    res.status(200).cookie('jwt', token).json({ token });
  }
}

module.exports = LoginController;