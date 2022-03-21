import * as types from '../mutation-types'
// initial state
const state = {
  isShow: true,
  activeNav: window.localStorage.getItem('activeNav') || '',
  navList: [],
  accountMenu: [],
  isCollapse: false,
  topNavList: [],
  isTopCollapse: false,
}
// getters
const getters = {
  isShow: state => state.isShow,
  activeNav: state => state.activeNav,
  navList: state => state.navList,
  accountMenu: state => state.accountMenu,
  isCollapse: state => state.isCollapse,
  topNavList: state => state.topNavList,
  isTopCollapse: state => state.isTopCollapse,
}
// actions
const actions = {
  setActiveNavId({ commit, state }, activeNav) {
    commit(types.SET_ACTIVE_NAV, activeNav)
  },
  updateNavList({ commit, state }, navList) {
    commit(types.UPDATE_SIDE_NAV_LIST, navList)
  },
  updateTopNavList({ commit, state }, navList) {
    commit(types.UPDATE_TOP_NAV_LIST, navList)
  },
  updateAccountNavList({ commit, state }, navList) {
    commit(types.UPDATE_ACCOUNT_NAV_LIST, navList)
  },
  setSideBarState({ commit, state }, status) {
    commit(types.SET_SIDE_BAR_STATE, status)
  },
  setIsCollapse({ commit, state }, status) {
    commit(types.UPDATE_IS_COLLAPSE, status)
  },
  setIsTopCollapse({ commit, state }, status) {
    commit(types.UPDATE_IS_TOP_COLLAPSE, status)
  },
  reset({ commit }) {
    commit(types.RESET_SIDEBAR_STATE)
  }
}
// mutations
const mutations = {
  [types.SET_ACTIVE_NAV](state, nav) {
    window.localStorage.setItem('activeNav', nav)
    state.activeNav = nav
  },
  [types.UPDATE_ACCOUNT_NAV_LIST](state, navList) {
    // const menuList = [];
    // navList.forEach(nav => {
    //   if (nav.pid == 25) {
    //     menuList.push(nav)
    //   }
    // })
    state.accountMenu = menuList;
  },
  [types.UPDATE_SIDE_NAV_LIST](state, menuList) {
    state.navList = menuList;
  },
  [types.UPDATE_TOP_NAV_LIST](state, menuList) {
    state.topNavList = menuList;
  },
  [types.SET_SIDE_BAR_STATE](state, isShow) {
    state.isShow = isShow
  },
  [types.UPDATE_IS_COLLAPSE](state, isCollapse){
    state.isCollapse = isCollapse;
  },
  [types.UPDATE_IS_TOP_COLLAPSE](state, isCollapse){
    state.isTopCollapse = isCollapse;
  },
  [types.RESET_SIDEBAR_STATE](state) {
    state.isShow = true
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
