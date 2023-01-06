const RequestRepository = require('../repositories/request.repository.js');
const { service_request } = require('../models');

class RequestService {
  requestRepository = new RequestRepository(service_request);

  findAllRequest = async () => {
    const allRequest = await this.requestRepository.findAllRequest();

    allRequest.sort((a, b) => {
      return b.created_At - a.created_At;
    });

    return allRequest.map( request => {
      return {
        name: request.name,
        phone: request.phone,
        addresss: request.addresss,
        request_details: request.request_details,
        photo: request.photo
      }
    })
  }

  createRequest = async (user_id, body, photo) => {
    console.log('세탁요청 서비스 진입');
    console.log(user_id, body, photo);
    await this.requestRepository.create(user_id, body, photo);

    return true;
  }
}

module.exports = RequestService;