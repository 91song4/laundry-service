//비즈니스로직계층 실제 사용자가 원하는 요구사항 구현
//데이터를 클라이언트에 보낼 때 가공하는 부분

//저장소에 데이터 요청

const GetallRepository = require('../repositories/getall.repository');

class GetallService{
    getallRepository = new GetallRepository();

    findAllLaundry = async()=>{
        // 저장소(Repository)에게 데이터를 요청합니다.
        //console.log('세탁물 전부 불러오는 서비스 진입');
        const allLaundry = await this.getallRepository.findAllRequire();
        console.log("service에서 포토",allLaundry.photo);
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
                photo:laundry.photo,
                request_details:laundry.request_details,
            };
        });
    };
    
    //수거완료->배송중->배송완료 로 업데이트 가능
    //배송완료 user point +10,000
    updateRequireStatus = async(request_id,provider_id,current_status)=>{//비어있는거는 사장아이디가 필요해
        //console.log("service옴",request_id,current_status,provider_id);
        const findRequire = await this.getallRepository.updateStatus(request_id,provider_id,current_status);
        if(!findRequire) throw new Error("받은 요청이 없음");
        //-1이면 안돼 다시 선택해주세요                         오류1
        //대기중(1)-수거중(2)-수거완료(3)-배송중(4)-배송완료(5)
        // if(provider_id) 유저타입이 사장이면 권한없음         오류2
        // if(current_status <3) throw new Error("권한없음");
        //사장님은 오로지 1개
        
        //if(current_status === 5){};   배송완료(5) 면 10,000 put도 넣어야함

        //await this.getallRepository.updateStatus(current_status, provider_id);
        //순서대로만 업데이트
        return {
            request_id:findRequire.request_id,
            current_status:findRequire.current_status,
            provider_id:findRequire.provider_id,
        };
    };

}

module.exports = GetallService;