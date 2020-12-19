import request from '@/utils/request'

// 查询作业设备列表
export function listDevice(query) {
  return request({
    url: '/workpoint/device/list',
    method: 'get',
    params: query
  })
}

// 查询作业设备详细
export function getDevice(id) {
  return request({
    url: '/workpoint/device/' + id,
    method: 'get'
  })
}

// 新增作业设备
export function addDevice(data) {
  return request({
    url: '/workpoint/device',
    method: 'post',
    data: data
  })
}

// 修改作业设备
export function updateDevice(data) {
  return request({
    url: '/workpoint/device',
    method: 'put',
    data: data
  })
}

// 删除作业设备
export function delDevice(id) {
  return request({
    url: '/workpoint/device/' + id,
    method: 'delete'
  })
}
