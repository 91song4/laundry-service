class SignupRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  createUser = async (email, name, phone, address, pw, user_type, point) => {
    console.log('레파지토리 진입');
    return await this.UserModel.create({ email, name, phone, address, pw, user_type, point });
    // console.log('레파지토리 퇴장');
    return createUserData;
  }
}

module.exports = SignupRepository;