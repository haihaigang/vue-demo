import Vue from 'vue'
import * as types from './mutation-types'

export default {
    [types.RECEIVE_ALL](state, { data }) {
        state.coupons = data;
    },

    [types.SWITCH_THREAD](state, { key, data }) {
        state.current = key;
        state.coupons = data;
    }
}
