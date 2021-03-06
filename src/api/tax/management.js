import request from '@/utils/request'

// 查询司机食宿管理列表
export function listManagement(query) {
  return request({
    url: '/tax/management/list',
    method: 'get',
    params: query
  })
}

// 查询司机食宿管理详细
export function getManagement(id) {
  return request({
    url: '/tax/management/' + id,
    method: 'get'
  })
}

//单据号返回
export  function DocumentNo(){
  return request({
    url:'/tax/management/DocumentNo',
    method:'get'
  })
}
// 新增司机食宿管理
export function addManagement(data) {
  return request({
    url: '/tax/management',
    method: 'post',
    data: data
  })
}

// 修改司机食宿管理
export function updateManagement(data) {
  return request({
    url: '/tax/management',
    method: 'put',
    data: data
  })
}

//批量修改
export function updateApproveStates(approveState,approveMsg,id){
  return request({
    url:'/tax/management/ApproveStates/'+ approveState+'/'+approveMsg +'/'+ id,
    method:'post',
  })
}
// 删除司机食宿管理
export function delManagement(id) {
  return request({
    url: '/tax/management/' + id,
    method: 'delete'
  })
}


export function listReportDate(query) {
  return request({
    url: '/tax/management/listReportDate',
    method: 'get',
    params: query
  })
}
