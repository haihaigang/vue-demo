const data = require('./mock-data')
const LATENCY = 16
import BaseApi from '../../base/api/BaseReq'

class MemberApi extends BaseApi {
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

export default new MemberApi();
