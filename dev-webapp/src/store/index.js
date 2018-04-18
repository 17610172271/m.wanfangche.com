import Vue from 'vue'
import Vuex from 'vuex'
import today from '@/tools/date/today'

import * as types from './mutation-types'
import FeedModule from './modules/feed'

import JWT from '@/tools/jwt'
import {isJson} from '@/tools/util'

Vue.use(Vuex)

export const AUTH_TOKEN_KEY = 'WFC_AUTH_TOKEN'
export const CURRENT_CITY = 'CURRENT_CITY'

export const state = {
  token: window.localStorage.getItem(AUTH_TOKEN_KEY), // 当前JWT
  currentCity: window.localStorage.getItem(CURRENT_CITY),  // 当前城市
  messageData: {
    pickup_city: '北京市',
    return_city: '北京市',
    pickup_id: 110100,
    return_id: 110100,
    pickup_datetime: today(1) + ' 10:00',
    return_datetime: today(7) + ' 18:00'
  },
  query: {
    pickup_city: '北京市',
    return_city: '北京市',
    pickup_id: 110100,
    return_id: 110100,
    pickup_datetime: today(1) + ' 10:00',
    return_datetime: today(2) + ' 10:00'
  },
  cityList: null,
  cityPick: false,
  navigation: null,
  feedList: null
}

export const getters = {
  token: state => {
    return state.token
  },
  // 当前登录用户
  currentUser: state => {
    return JWT.payload(state.token) || {}
  },
  // 用户登录状态
  isLoggedin: state => {
    return JWT.payload(state.token) && JWT.payload(state.token).user_id > 0 // 判断用户ID
  },
  isAgency: state => {
    return JWT.payload(state.token) && (JWT.payload(state.token).status === '3')
  },
  currentCity: state => {
    return state.currentCity && isJson(state.currentCity) ? JSON.parse(state.currentCity) : {city: '北京市', cityid: '110100'}
  },
  cityList: state => {
    return state.cityList
  },
  query: state => {
    return state.query
  },
  cityPick: state => {
    return state.cityPick
  },
  feedList: state => {
    return state.feedList
  },
  navigation: state => {
    return state.navigation
  }
}

export const actions = {
  // 保存 token
  saveToken ({ commit }, { token }) {
    commit(types.CLEAR_TOKEN)

    if (JWT.valid(token)) {
      commit(types.SAVE_TOKEN, { token: token })
      return true
    } else {
      return false
    }
  },
  clearToken ({ commit }) {
    commit(types.CLEAR_TOKEN)
  },
  saveCurrentCity ({commit}, city) {
    commit(types.SAVE_CURRENT_CITY, city)
  },
  // 退出登录
  doLogout ({ commit }) {
    commit(types.CLEAR_TOKEN)
  },
  saveCityList ({ commit }, { list }) {
    commit(types.SAVE_CITY_LIST, { list })
  },
  saveQuery ({ commit }, { query }) {
    commit(types.SAVE_QUERY, { query })
  },
  saveCityPick ({ commit }, { cityPick }) {
    commit(types.SAVE_CITY_PICK, { cityPick })
  },
  saveFeedList ({commit}, list) {
    commit(types.SAVE_FEED_LIST, list)
  },
  saveNavigation ({commit}, { list }) {
    commit(types.SAVE_NAVIGATION, { list })
  }
}

export const mutations = {
  // 清空 auth token
  [types.CLEAR_TOKEN] (state) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    state.token = null
  },
  // 保存 token 到本地
  [types.SAVE_TOKEN] (state, { token }) {
    if (token !== state.token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token)
      state.token = token
    }
  },
  [types.SAVE_CURRENT_CITY] (state, city) {
    state.currentCity = JSON.stringify(city)
    window.localStorage.setItem(CURRENT_CITY, JSON.stringify(city))
  },
  [types.SAVE_CITY_LIST] (state, { list }) {
    state.cityList = list
  },
  [types.SAVE_QUERY] (state, { query }) {
    state.query = query
  },
  [types.SAVE_CITY_PICK] (state, { cityPick }) {
    state.cityPick = cityPick
  },
  [types.SAVE_FEED_LIST] (state, list) {
    state.feedList = list
  },
  [types.SAVE_NAVIGATION] (state, { list }) {
    state.navigation = list
  }
}

export default new Vuex.Store({
  modules: {
    feed: FeedModule
  },
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
