import BaseApi from '../../base/api/BaseReq'

class Api extends BaseApi {
    constructor() {
        super();
    }

    getCoupons(params, cb) {
        this.send({
            url: '/api/member/coupon/getList',
            params: params
        }).then((response) => {
            cb(response)
        })
    }

}

export default new Api();
