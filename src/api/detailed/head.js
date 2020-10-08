// api/system/user.js
import request from '@/utils/request'

// 新增终端配置
export function add(data) {
  return request({
    url: '/manifest/nemsinvtheadtype/add',
    method: 'post',
    data: data
  })
}


// 查询【请填写功能名称】详细
export function getNemsinvtheadtype(id) {
  return request({
    url: '/manifest/nemsinvtheadtype/' + id,
    method: 'get'
  })
}
