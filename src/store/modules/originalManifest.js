
import * as  req from '@/api/originalManifest/originalManifest';
const state = {
  status:0,
  // 通知人信息
  noticeInfo:[],
  // 变更原因
  changeReason:{list:[]},
  // 途径国家地区信息
  regionInfo:[],
  // 危险品联系人信息
  dangerousInfo:[],
  // 发货人信息
  consignorInfo:[],
  // 收货人信息
  receivingInfo:{
    consigneeList:[],
    manifestContactList:[]
  },
}

const mutations = {
  changeStatus(state,data){
    console.log(111);
    state.status = data
  },
  noticeInfo(state,data){
    state.noticeInfo = data
  },
  changeReason(state,data){
    state.changeReason = data
  },
  regionInfo(state,data){
    state.regionInfo = data
  },
  dangerousInfo(state,data){
    state.dangerousInfo = data
  },
  consignorInfo(state,data){
    state.consignorInfo = data
  },
  receivingInfo(state,data){
    state.receivingInfo = data
  },
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
  },
  noticeInfo( {dispatch , commit} , data){
    commit('noticeInfo',data)
  },
  changeReason( {dispatch , commit} , data){
    commit('changeReason',data)
  },
  regionInfo( {dispatch , commit} , data){
    commit('regionInfo',data)
  },
  dangerousInfo( {dispatch , commit} , data){
    commit('dangerousInfo',data)
  },
  consignorInfo( {dispatch , commit} , data){
    commit('consignorInfo',data)
  },
  receivingInfo( {dispatch , commit} , data){
    commit('receivingInfo',data)
  },
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}