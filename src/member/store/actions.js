import MemberApi from '../api'
import * as types from './mutation-types'

export const getDetail = ({ commit }) => {
    MemberApi.getDetail(data => {
        commit(types.RECEIVE_ALL, {
            data
        })
    })
}

export const sendMessage = ({ commit }, payload) => {
    api.createMessage(payload, message => {
        commit(types.RECEIVE_MESSAGE, {
            message
        })
    })
}

export const switchThread = ({ commit }, payload) => {
    commit(types.SWITCH_THREAD, payload)
}
