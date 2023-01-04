const RequestRepository = require('../repositories/request.repository.js');
const { service_request } = require('../models');

class RequestService {
  requestRepository = new RequestRepository(service_request);

  createRequest = async (data) => {
    console.log('세탁요청 서비스 진입');
    await this.requestRepository.create(data);

    return true;
  }
}

module.exports = RequestService;