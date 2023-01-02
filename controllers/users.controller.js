const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const UserService = require('../services/users.service.js');

class UserController {
  userService = new UserService();

  signup = async (req, res, next) => {
    console.log('컨트롤러 진입');
    const { email, name, phone, address, pw, confirm, user_type } = req.body;
    const point = user_type ? 10000 : 0;
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (pw !== confirm) {
      return res.status(412).json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }
    if (regex.test(email) === false) {
      return res.status(412).json({ errorMessage: '이메일의 형식이 일치하지 않습니다.' });
    }
    if (pw.length < 4) {
      return res.status(412).json({ errorMessage: '패스워드 형식이 일치하지 않습니다.' })
    }
    if (!email || !name || !phone || !address || !pw || !confirm || !String(user_type)) {

      return res.status(400).json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' })
    }
    
    const hash = crypto.createHash('sha512').update(pw + process.env.SECRET_KEY).digest('hex');
    
    const createUserData = await this.userService.createUser(email, name, phone, address, hash, user_type, point);

    if (createUserData !== 1) {
      let errMsg = '';
      if (email === createUserData.email) {
        errMsg = '이메일';
      } else if (name === createUserData.name) {
        errMsg = '닉네임';
      } else if (phone === createUserData.phone) {
        errMsg = '전화번호';
      }

      return res.status(412).json({ errorMessage: `중복된 ${errMsg}입니다.` });
    }
    return res.status(201).json({ message: `회원 가입에 성공하였습니다. ${point}point` });
  }

  login = async (req, res) => {
    console.log('로그인 컨트롤러 진입');
    const { email, pw } = req.body;
    const hash = crypto.createHash('sha512').update(pw + process.env.SECRET_KEY).digest('hex');
    console.log(hash);
    const userData = await this.userService.loginUser(email, hash);

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

module.exports = UserController;