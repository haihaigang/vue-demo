import BaseApi from '../../base/api/BaseReq'

class Api extends BaseApi {
    constructor() {
        super();
    }

    getDetail(cb) {
        this.send({
            url: '/api/member/info/get'
        }).then((response) => {
            cb(response)
        })
    }

}

export default new Api();
