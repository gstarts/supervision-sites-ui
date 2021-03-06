import request from '@/utils/request'

// 查询库存库位列表
export function listStore(query) {
  return request({
    url: '/tax/store/list',
    method: 'get',
    params: query
  })
}

// 查询空闲库位
export function getListStore(query) {
  return request({
    url: '/tax/store/listStore',
    method: 'get',
    params: query
  })
}

// 查询库存库位详细
export function getStore(id) {
  return request({
    url: '/tax/store/' + id,
    method: 'get'
  })
}

// 新增库存库位
export function addStore(data) {
  return request({
    url: '/tax/store',
    method: 'post',
    data: data
  })
}

// 修改库存库位
export function updateStore(data) {
  return request({
    url: '/tax/store',
    method: 'put',
    data: data
  })
}

// 删除库存库位
export function delStore(id) {
  return request({
    url: '/tax/store/' + id,
    method: 'delete'
  })

}

export function getStoreUsable(placeId) {
  return request({
    url: '/tax/store/usable/' + placeId,
    method: 'post'
  })
}

export function getStoreNow(data) {
  return request({
    url: '/tax/store/now',
    method: 'post',
    data: data
  })
}

