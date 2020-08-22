
import * as  req from '@/api/originalManifest/originalManifest';
const state = {
  status:0
}

const mutations = {
  changeStatus(state,data){
    console.log(111);
    state.status = data
  }
}

const actions = {
  depParaList( {dispatch , commit} , data){
    return  req.depParaList(data)
  },
  changeStatus({dispatch , commit} , data){
    console.log(123);
    commit('changeStatus',new Date().getTime())
  }
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}