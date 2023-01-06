const RequestService = require('../services/request.service.js');

class RequestController {
  requestService = new RequestService();

  getRequests = async (req, res, next) => {
    const requests = await this.requestServcie.findAllRequest();

    res.status(200).json({ data: requests });
  };

  createRequest = async (req, res) => {
    console.log('세탁요청 컨트롤러 진입');
    const userInfo = res.locals.user;
    const { name, phone, address, request_details } = req.body;
    const { filename: photo } = req.file;
    console.log(userInfo);
    await this.requestService.createRequest(userInfo.user_id,req.body, photo);

    res.status(200).json({ message: '세탁 서비스 신청 완료.' });
  }
}

module.exports = RequestController;