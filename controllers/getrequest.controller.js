//클라이언트의 요청을 처리 한 후 서버에서 처리된 결과를 반환
//예외(Exception)를  처리 
const GetrequestService = require('../services/getrequest.service');
const jwt = require('jsonwebtoken');

// require_status의 컨트롤러(Controller)역할을 하는 클래스 
class GetrequestController{
    // require_status 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다
    getrequestService = new GetrequestService();

    getRequest = async(req,res,next)=>{
        console.log("잘들어갔나control")
        //접속한 유저의 아이디로 자기가 맡긴 세탁 불러오려고 유저아이디 꺼내옴
        const user_id = res.locals.user.user_id;
        console.log(user_id,"userid")
        // 서비스 계층에 구현된 findAllLaundry 로직을 실행합니다.
        const requirestatus = await this.getrequestService.findLaundry(user_id);
        
        res.status(200).json({data:requirestatus});
    };

}

module.exports = GetrequestController;