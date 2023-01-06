class RequestRepository{
  constructor(model) {
    this.model = model;
  }

  findAllRequest = async () => {
    const requests = await this.model.findAll();

    return requests;
  }

  create = async (user_id, body,photo) => {
    console.log('세탁요청 레파지토리 진입');
    console.log(user_id, body, photo);
    await this.model.create({user_id, ...body,photo });
    return true;
  }
}

module.exports = RequestRepository;