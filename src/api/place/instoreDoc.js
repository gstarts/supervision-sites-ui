import request from '@/utils/request'

// 查询入库通知单列表
export function listInstoreDoc(query) {
  return request({
    url: '/place/instoreDoc/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单列表
export function listInstoreDocLike(query) {
  return request({
    url: '/place/instoreDoc/listLike',
    method: 'get',
    params: query
  })
}
// 查询入库通知单列表
export function listInstoreReportLike(query) {
  return request({
    url: '/place/instoreDoc/listReportLike',
    method: 'get',
    params: query
  })
}



// 查询入库通知单详细
export function getInstoreDoc(id) {
  return request({
    url: '/place/instoreDoc/' + id,
    method: 'get'
  })
}

// 新增入库通知单
export function addInstoreDoc(data) {
  return request({
    url: '/place/instoreDoc',
    method: 'post',
    data: data
  })
}

// 修改入库通知单
export function updateInstoreDoc(data) {
  return request({
    url: '/place/instoreDoc',
    method: 'put',
    data: data
  })
}

// 删除入库通知单
export function delInstoreDoc(id) {
  return request({
    url: '/place/instoreDoc/' + id,
    method: 'delete'
  })
}
//调入调出周报表
export function customsWeekList(params) {
  return request({
    url: '/place/instoreDoc/customsWeekList',
    method: 'post',
    data: params
  })
}
//调入调出月报表
export function customsMonthList(params) {
  return request({
    url: '/place/instoreDoc/customsMonthList',
    method: 'post',
    data: params
  })
}
//海关-场所日报
export  function customsDayList(params){
  return request({
    url:'/place/instoreDoc/customsDayList',
    method:'post',
    data:params
  })
}

//调入调出汇总表
export function customsMonthHz(params) {
  return request({
    url: '/place/instoreDoc/customsMonthHz',
    method: 'post',
    data: params
  })
}


// 参数 {placeId,contractNo,storeCode || businessNo}
//如果 多个库位IDS，用businessNo 变量来接收
//如果单个 库位，用storeCode
export function getStockByCondition(params) {
  return request({
    url: '/place/instoreDoc/stockByCondition',
    method: 'post',
    data: params
  })
}
