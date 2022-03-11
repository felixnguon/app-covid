import storage from '../../utils/storage'

const COUNTRY_BOOKMARK = 'COUNTRY_BOOKMARK'

const state = {
  bookmarks: []
}

const mutations = {
  FETCH_BOOKMARK: state => {
    state.bookmarks = storage.get(COUNTRY_BOOKMARK) || []
  },
  SET_BOOKMARK: (state, value) => {
    state.bookmarks.push(value)
    storage.save(COUNTRY_BOOKMARK, state.bookmarks)
  },
  REMOVE_BOOKMARK: (state, value) => {
    state.bookmarks = state.bookmarks.filter(item => item !== value)
    storage.save(COUNTRY_BOOKMARK, state.bookmarks)
  }
}

const actions = {
  subscribe: ({ commit }, item) => {
    return new Promise((resolve, reject) => {
      commit('SET_BOOKMARK', item)
      resolve(true)
    })
  },
  remove: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('REMOVE_BOOKMARK', item)
      resolve(true)
    })
  },
  getAll: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('FETCH_BOOKMARK')
      resolve(true)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
