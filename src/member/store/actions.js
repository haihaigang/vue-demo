import MemberApi from '../api'
import * as types from './mutation-types'

console.log(MemberApi)
export const getDetail = ({ commit }) => {
  MemberApi.getDetail(messages => {
    commit(types.RECEIVE_ALL, {
      messages
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
