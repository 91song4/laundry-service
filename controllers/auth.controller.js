const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserService = require('../services/users.service.js');

class AuthController {
  userService = new UserService();

  login = async (req, res) => {
    console.log('로그인 컨트롤러 진입');
    const { email, pw } = req.body;
    const hash = crypto.createHash('sha512').update(pw + process.env.SECRET_KEY).digest('hex');
    console.log(hash);

    const userData = await this.userService.loginUser(email, hash);

    if (userData === -1) {
      return res.status(400).json({ errorMessage: "아이디가 없습니다." });
    }
    if (userData === -2) {
      return res.status(400).json({ errorMessage: "비밀번호가 틀립니다." });
    }

    const token = jwt.sign(
      { user_id: userData.user_id },
      process.env.SECRET_KEY,
      { expiresIn: "60m" }    // 토큰 유효 기간
    )

    res.status(200).cookie('jwt', token).json({ token });
  }

  auth_middleware = async (req, res, next) => {
    console.log('토큰 검증 미들웨어');
    const token = req.cookies.jwt;
    console.log('test1,',token);
    try {
      const isAvailableToken = this.validateToken(token);
      console.log('test2',isAvailableToken);
      if (!(isAvailableToken === false)) {
        const userId = isAvailableToken.user_id;
        console.log('test3',userId);
        await this.userService.findIdUser(userId)
          .then((user) => {
            res.locals.user = user;
            next();
          });
      } else {
        throw new Error('검증 실패');
      }
    } catch (err) {
      console.error(err, 'error:');
      res.status(400).json({ errorMessage: '로그인이 필요합니다.' });
    }
  }

  validateToken = (token) => {
    try {
      const userId = jwt.verify(token, process.env.SECRET_KEY);
      return userId;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = AuthController;