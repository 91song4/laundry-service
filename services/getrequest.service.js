//비즈니스로직계층 실제 사용자가 원하는 요구사항 구현
//데이터를 클라이언트에 보낼 때 가공하는 부분

//저장소에 데이터 요청

const GetrequestRepository = require('../repositories/getrequest.repository');

class GetrequestService{
    getrequestRepository = new GetrequestRepository();
    
    findLaundry = async(user_id)=>{
        console.log("잘들어갔나service")
        // 저장소(Repository)에게 데이터를 요청합니다.
        //console.log('세탁물 전부 불러오는 서비스 진입');
        const allLaundry = await this.getrequestRepository.findRequire(user_id);
        //console.log("뭐받아오는지 보기",allLaundry);
        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return allLaundry.map((laundry)=>{
            return {
                request_id:laundry.request_id,
                current_status:laundry.current_status,
                provider_id:laundry.provider_id,
                name:laundry.name,
                address:laundry.address,
                phone:laundry.phone,
                request_details:laundry.request_details,
            };
        });
    };

}

module.exports = GetrequestService;