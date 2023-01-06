const RequestRepository = require('../repositories/request.repository.js');
const { service_request } = require('../models');
class RequestService {
  requestRepository = new RequestRepository(service_request);
  
  createRequest = async (user_id, body, photo) => {
    console.log('세탁요청 서비스 진입');
    console.log(user_id, body, photo);
    await this.requestRepository.create(user_id, body, photo);
    
    return true;
  }
  
}

module.exports = RequestService;