import api from '../api'
import * as types from './mutation-types'

export const getCoupons = ({ commit }) => {
    api.getCoupons({ status: 0 }, data => {
        commit(types.RECEIVE_ALL, {
            data
        })
    })
}

export const switchTab = ({ commit }, key) => {
    api.getCoupons({ status: key }, data => {
        commit(types.SWITCH_THREAD, {
            key,
            data
        })
    })
}
