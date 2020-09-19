import request from '@/utils/request'

// 查询货品明细列表
export function listGoodslst(query) {
  return request({
    url: '/taxstore/goodslst/list',
    method: 'get',
    params: query
  })
}

// 查询货品明细详细
export function getGoodslst(goodsLstId) {
  return request({
    url: '/taxstore/goodslst/' + goodsLstId,
    method: 'get'
  })
}

// 新增货品明细
export function addGoodslst(data) {
  return request({
    url: '/taxstore/goodslst',
    method: 'post',
    data: data
  })
}

// 修改货品明细
export function updateGoodslst(data) {
  return request({
    url: '/taxstore/goodslst',
    method: 'put',
    data: data
  })
}

// 删除货品明细
export function delGoodslst(goodsLstId) {
  return request({
    url: '/taxstore/goodslst/' + goodsLstId,
    method: 'delete'
  })
}

// 查询入库细单列表
export function listByGoodsid(goodsId) {
  return request({
    url: '/taxstore/goodslst/goodsId/'+goodsId,
    method: 'get'
  })
}


