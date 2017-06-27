import api from '../api'
import * as types from './mutation-types'

export const getDetail = ({ commit }) => {
    api.getDetail(data => {
        commit(types.RECEIVE_ALL, {
            data
        })
    })
}
