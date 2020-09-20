import request from '@/utils/request'

// 查询货品与库位对应列表
export function listGoods_store(query) {
  return request({
    url: '/taxstore/goods_store/list',
    method: 'get',
    params: query
  })
}

// 查询货品与库位对应详细
export function getGoods_store(goodsId) {
  return request({
    url: '/taxstore/goods_store/' + goodsId,
    method: 'get'
  })
}

// 新增货品与库位对应
export function addGoods_store(data) {
  return request({
    url: '/taxstore/goods_store',
    method: 'post',
    data: data
  })
}

// 修改货品与库位对应
export function updateGoods_store(data) {
  return request({
    url: '/taxstore/goods_store',
    method: 'put',
    data: data
  })
}

// 删除货品与库位对应
export function delGoods_store(goodsId) {
  return request({
    url: '/taxstore/goods_store/' + goodsId,
    method: 'delete'
  })
}
