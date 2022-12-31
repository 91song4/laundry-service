//비즈니스로직계층 실제 사용자가 원하는 요구사항 구현
//데이터를 클라이언트에 보낼 때 가공하는 부분

//저장소에 데이터 요청
const GetallRepository = require('../repositories/getall.repository');

class GetallService{
    getallRepository = new GetallRepository();

    findAllLaundry = async()=>{
        // 저장소(Repository)에게 데이터를 요청합니다.
        const allLaundry = await this.getallRepository.findAllLaundry();

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return allLaundry.map((laundry)=>{
            return {
                request_id:laundry.request_id,
                current_status:laundry.current_status,
                updated_At:laundry.updated_At,
            };
        });
    };
    
    findRequireStatus = async(provider_id)=>{
        const findRequire = await this.getallRepository.findRequireStatus(provider_id);

        return{
            request_id:findRequire.request_id,
            current_status:findRequire.current_status,
            updated_At:findRequire.updated_At,
        };
    };

    //수거완료->배송중->배송완료 로 업데이트 가능
    //배송완료 user point +10,000
    updateRequireStatus = async(current_status, provider_id)=>{
        const findRequire = await this.getallRepository.findRequireStatus(provider_id);
        if(!findRequire) throw new Error("받은 요청이 없음");
        //대기중(1)-수거중(2)-수거완료(3)-배송중(4)-배송완료(5)
        if(current_status <3) throw new Error("권한없음");
        
        //if(current_status === 5){};

        await this.getallRepository.updateRequireStatus(current_status, provider_id);

        return {
            request_id:findRequire.request_id,
            current_status:findRequire.current_status,
            updated_At:findRequire.updated_At,
        };
    };

}

module.exports = GetallService;