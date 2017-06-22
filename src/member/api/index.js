const data = require('./mock-data')
const LATENCY = 16
import BaseApi from '../../base/api/BaseReq'

class MemberApi extends BaseApi {
	constructor(){
		super();
	}

	getDetail(cb){
		this.send({
			url: '/api/member/info/get'
		}).then((response) =>{
			cb(response)
		})
	}

}

export default new MemberApi();

export function getAllMessages(cb) {
    setTimeout(() => {
        cb(data)
    }, LATENCY)
}

export function createMessage({ text, thread }, cb) {
    const timestamp = Date.now()
    const id = 'm_' + timestamp
    const message = {
        id,
        text,
        timestamp,
        threadID: thread.id,
        threadName: thread.name,
        authorName: 'Evan'
    }
    setTimeout(function() {
        cb(message)
    }, LATENCY)
}
