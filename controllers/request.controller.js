const RequestService = require('../services/request.service.js');

class RequestController{
  requestService = new RequestService();
  
  createRequest = async (req, res) => {
    console.log('세탁요청 컨트롤러 진입');
    const userInfo = res.locals.user;
    const { name, phone, address, photo, request_detail } = req.body;
    const data = req.body;
    await this.requestService.createRequest(data);

    res.status(200).json({message:'세탁 서비스 신청 완료.'});
  }
}

module.exports = RequestController;