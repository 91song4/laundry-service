const { Op } = require('sequelize');

class UserRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  createUser = async (email, name, phone, address, pw, user_type, point) => {
    console.log('레파지토리 진입');
    const userData = await this.UserModel.findOne({
      raw: true,
      where: {
        [Op.or]: [
          { email },
          { name },
          { phone },
        ]
      },
      attributes: [
        'email',
        'name',
        'phone',
      ]
    });

    if (userData) {
      return userData;
    }

    // console.log('레파지토리 퇴장');
    await this.UserModel.create({ email, name, phone, address, pw, user_type, point });
    return 1;
  }

  findUser = async (email) => {
    console.log('로그인 레파짓토리 진입');
    const createUserData = await this.UserModel.findOne({ raw: true, where: { email } });
    return createUserData;
  }
}

module.exports = UserRepository;