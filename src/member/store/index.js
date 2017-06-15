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
  abc: 1,
  avatar: 'http://wx.qlogo.cn/mmopen/BUlic2na2WmkMIvswGnFhTuxYOKwOPhKcgCwc5m16AwuwSPYsUrL5svibWwCrBc8Wiakd4icQfdCFCRkFfovFEC8UewN7StkvEpm/0'
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
