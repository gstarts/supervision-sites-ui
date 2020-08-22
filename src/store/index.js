import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
// import user from './modules/user'
// import tagsView from './modules/tagsView'
// import permission from './modules/permission'
// import settings from './modules/settings'
import getters from './getters'
// 数据持久化
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 自动导入modules下所有模块
const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  // plugins: [persistedState({ storage: window.sessionStorage })],
  modules,
  getters,
})

export default store