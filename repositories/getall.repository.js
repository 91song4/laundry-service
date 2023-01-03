//저장소계층
//db와 관련된 작업 수행, db관리, db crud

const {request_status} = require("../models");

class Getallrepository {
  
  // ORM인 Sequelize에서 Require_status 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
  findAllRequire = async () => {
    
    const require_status = await request_status.findAll();
    console.log("repository옴?");
    return require_status;
  };

  //작업중인 세탁물 상태 업데이트
  //수거완료->배송중->배송완료 로 업데이트 가능
  //배송완료 user point +10,000
  updateStatus = async (request_id,provider_id,current_status) => {
    console.log("repository왔니?",request_id,provider_id,current_status);
    const updateRequireStatus = await request_status.update(
      { current_status },
      { where: { provider_id } }
    );

    return updateRequireStatus;
  };
}

module.exports = Getallrepository;