class RequestRepository{
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    console.log('세탁요청 레파지토리 진입');
    // await this.model.create({ data });
    return true;
  }
}

module.exports = RequestRepository;