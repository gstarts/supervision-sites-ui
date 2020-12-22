import request from '@/utils/request'

// 查询取样管理 主列表
export function listLord(query) {
  return request({
    url: '/tax/lord/list',
    method: 'get',
    params: query
  })
}

// 查询取样管理 主详细
export function getLord(id) {
  return request({
    url: '/tax/lord/' + id,
    method: 'get'
  })
}
//通过LotNo查询
export function LotNoList(LotNo){
  return request({
    url:'/tax/instore_doc_detail/ByLotNo/'+LotNo,
    method:'get'
  })
}
//新增子表数据
export function InsertListLotNo(data){

  return request({
    url:'/tax/body/InsertList',
    method:'post',
    data:data
  })
}

// 查询取样管理 子列表
export function listBody(query) {
  return request({
    url: '/tax/body/list',
    method: 'get',
    params: query
  })
}

// 查询取样管理 子详细
export function getBody(id) {
  return request({
    url: '/tax/body/' + id,
    method: 'get'
  })
}

// 新增取样管理 主
export function addLord(data) {
  return request({
    url: '/tax/lord',
    method: 'post',
    data: data
  })
}

// 修改取样管理 主
export function updateLord(data) {
  return request({
    url: '/tax/lord',
    method: 'put',
    data: data
  })
}

// 删除取样管理 主
export function delLord(id) {
  return request({
    url: '/tax/lord/' + id,
    method: 'delete'
  })
}
