import request from '@/utils/request'

// 查询堆场分区信息列表
export function listZone(query) {
  return request({
    url: '/place/zone/list',
    method: 'get',
    params: query
  })
}

// 查询堆场分区信息详细
export function getZone(id) {
  return request({
    url: '/place/zone/' + id,
    method: 'get'
  })
}

// 新增堆场分区信息
export function addZone(data) {
  return request({
    url: '/place/zone',
    method: 'post',
    data: data
  })
}

// 修改堆场分区信息
export function updateZone(data) {
  return request({
    url: '/place/zone',
    method: 'put',
    data: data
  })
}

// 删除堆场分区信息
export function delZone(id) {
  return request({
    url: '/place/zone/' + id,
    method: 'delete'
  })
}

///zoneCode/{placeId}/{zoneType}
// 获取zoneCode列表
export function getZoneList(placeId,zoneType) {
  return request({
    url: '/place/zone/zoneCode/'+placeId+'/'+zoneType,
    method: 'get'
  })
}
