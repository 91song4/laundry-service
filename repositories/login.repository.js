class LoginRepository{
  constructor(userModel) {
    this.userModel = userModel;
  }

  findUser = async (email) => {
    console.log('로그인 레파짓토리 진입');
    return await this.userModel.findOne({raw:true,where:{email}});
  }
}

module.exports = LoginRepository;