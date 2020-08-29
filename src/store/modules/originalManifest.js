
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
  saveList( {dispatch , commit} , data){
    return  req.saveList(data)
  },
  getVoyageNo( {dispatch , commit} , data){
    return  req.getVoyageNo(data)
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