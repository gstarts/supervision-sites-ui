import {login, logout, getInfo, refreshToken} from '@/api/login'
import {getToken, getRefreshToken, setToken, setRefreshToken, setExpiresIn, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    name: '',
    avatar: '',
    nickName: '',
    roles: [],
    permissions: [],
    dept: [], //保存用户所在部门
    poundConfig: '' //磅单页面配置
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, nickName) => {
      state.nickName = nickName
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expires_in = time
    },
    SET_REFRESH_TOKEN: (state, token) => {
      state.refresh_token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_DEPT: (state, dept) => {
      state.dept = dept
    },
    SET_POUND_CONFIG: (state, poundConfig) => {
      state.poundConfig = poundConfig
    }

  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.access_token)
          commit('SET_TOKEN', res.access_token)
          setRefreshToken(res.refresh_token)
          commit('SET_REFRESH_TOKEN', res.refresh_token)
          setExpiresIn(res.expires_in)
          commit('SET_EXPIRES_IN', res.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          const user = res.user
          const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          commit('SET_NICKNAME', user.nickName)
          commit('SET_DEPT', user.dept)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新token
    RefreshToken({commit, state}) {
      return new Promise((resolve, reject) => {
        //todo token总是失效，待查找问题原因
        refreshToken(state.refreshToken).then(res => {
          //refreshToken(state.refresh_token).then(res => {
          setToken(res.access_token)
          commit('SET_TOKEN', res.access_token)
          setRefreshToken(res.refresh_token)
          commit('SET_REFRESH_TOKEN', res.refresh_token)
          setExpiresIn(res.expires_in)
          commit('SET_EXPIRES_IN', res.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_POUND_CONFIG','')
        removeToken()
        resolve()
      })
    },

    //设置
    SetPoundConfig({commit}, poundConfig) {
      return new Promise(resolve => {
        commit('SET_POUND_CONFIG', poundConfig)
        resolve()
      })
    }

  }
}

export default user
