//저장소계층
//db와 관련된 작업 수행, db관리, db crud

const {request_status} = require("../models");
const {service_request} = require('../models');
class Getrequestrepository {
  
  // ORM인 Sequelize에서 Require_status 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
  findRequire = async (user_id) => {
    console.log("잘들어갔나reposi")
    const require_status = await request_status.findAll({
      raw:true,//풀어버림 데이터삭제
      include:[
        {
          model:service_request,
          required: true,//associated model 이 존재하는 객체만
          where: { user_id },//service_urquest.user_id = 2
        }
      ],
      attributes:['service_request.name','service_request.phone','service_request.address','service_request.request_details','current_status','request_id','provider_id']
    });
    console.log("repository옴?",require_status);
    return require_status;
  };
}

module.exports = Getrequestrepository;
