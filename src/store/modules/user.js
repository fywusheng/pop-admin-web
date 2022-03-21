import { login, getUserInfo } from '@/api/sys'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { userName, password } = userInfo
    const result = await login({loginName: userName.trim(), loginPwd: password })
    if (result.code - 0 === 200) {
      const token = _.get(result, 'data.token', '')
      commit('SET_TOKEN', token)
      setToken(token)
      return true
    } else {
      Message({
        message: result.msg,
        type: 'error'
      })
      return false
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const response = {
        'code': 200,
        'data': {
          'ctime': '2018-10-22 23:26:27',
          'email': '18520217720@163.com',
          'id': '1',
          'isDeleted': 0,
          'password': 'B84794857EBED47333E1E345031E383E5468213351A23A0AB1BD16F7',
          'phone': '18520217720',
          'realName': '超级管理员',
          'sex': 0,
          'status': 1,
          'username': 'admin',
          'utime': '2020-03-01 17:32:56'
        },
        'msg': '',
        'timestamp': '1586167527103'
      }
      const { data } = response

      const { username } = data

      // commit('SET_ROLES', roleNames)
      commit('SET_NAME', username)
      // commit('SET_AVATAR', avatar)
      // commit('SET_INTRODUCTION', introduction)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
