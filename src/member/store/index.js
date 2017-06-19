import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    currentThreadID: null,
    threads: {
        /*
        id: {
          id,
          name,
          messages: [...ids],
          lastMessage
        }
        */
    },
    messages: {
        /*
        id: {
          id,
          threadId,
          threadName,
          authorName,
          text,
          timestamp,
          isRead
        }
        */
    },
    avatar: 'http://wx.qlogo.cn/mmopen/BUlic2na2WmkMIvswGnFhTuxYOKwOPhKcgCwc5m16AwuwSPYsUrL5svibWwCrBc8Wiakd4icQfdCFCRkFfovFEC8UewN7StkvEpm/0',
    quickData: [[{
        name: '服务中心',
        icon: 'icon-servercenter',
        link: 'service.html'
    }, {
        name: '我的地址',
        icon: 'icon-address-big',
        link: 'addresses.html'
    }, {
        name: '我的活动',
        icon: 'icon-myactivity',
        link: 'groups.html'
    }, {
        name: '我的收藏',
        icon: 'icon-favorited',
        link: 'collect.html'
    }],[{
        name: '优惠券',
        icon: 'icon-coupon1',
        link: 'coupons.html'
    }, {
        name: '兑换优惠码',
        icon: 'icon-exchange',
        link: 'coupon.html'
    }, {
        name: '客服电话',
        icon: 'icon-tel-big',
        link: 'tel:021-54106970'
    }]]


}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
