//클라이언트의 요청을 처리 한 후 서버에서 처리된 결과를 반환
//예외(Exception)를  처리 
const GetallService = require('../services/getall.service');
const jwt = require('jsonwebtoken');

// require_status의 컨트롤러(Controller)역할을 하는 클래스 
class GetallController{
    // require_status 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다
    getallService = new GetallService();

    getRequireStatus = async(req,res,next)=>{
        // 서비스 계층에 구현된 findAllLaundry 로직을 실행합니다.
        const requirestatus = await this.getallService.findAllLaundry();
        //console.log("컨트롤러확인",requirestatus,jwt.sign);
        res.status(200).json({data:requirestatus});
    };

    updateRequireStatus = async(req,res,next)=>{
        //빨래번호받아와
        const {request_id} = req.params;
        //수정하려는 사람id, 수정하려는 상태
        const {current_status} = req.body;
        const provider_id = res.locals.user.user_id;//토큰에서 빼오는 user_id
        //console.log("provider_id,controller",provider_id)
        //console.log('controller확인',request_id,provider_id,current_status);
        // console.log(req.params);
        // console.log(req.body);
        const updateRequireStatus = await this.getallService.updateRequireStatus(request_id,provider_id,current_status);

        res.status(200).json({data:updateRequireStatus});
    };
}

module.exports = GetallController;