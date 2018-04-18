export default {
  // namespaced: true,
  state: {
    default: {
      name: 'default',
      list: [],
      page: 0,
      more: true,
      refresh: true,
      position: 0
    },
    recent: {
      list: [],
      page: 0,
      more: true,
      refresh: true
    },
    hot: {
      list: [],
      page: 0,
      more: true,
      refresh: true
    },
    follow: {
      name: 'follow',
      list: [],
      page: 0,
      more: true,
      refresh: true
    },
    nearby: {
      list: [],
      page: 0,
      more: true,
      refresh: true
    },
    topic: {
      list: [],
      page: 0,
      more: true,
      refresh: true,
      meta: {
        tid: 0
      }
    }
  },
  mutations: {
    saveFeed (state, {page = 1, list = [], type = 'default', refresh, more, meta}) {
      state[type].page = page || 0
      state[type].list = list || []
      if (typeof refresh !== 'undefined') state[type].refresh = refresh
      if (typeof more !== 'undefined') state[type].more = more
      if (typeof meta !== 'undefined') state[type].meta = meta
      console.log('saved', state[type])
    }
  },
  actions: {
    saveFeed ({commit, state}, payload) {
      commit('saveFeed', payload)
    }
  },
  getters: {
    feedStorage: (state) => (type = 'default') => {
      return state[type]
    }
  }
}
