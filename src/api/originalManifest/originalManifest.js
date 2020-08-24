// api/system/user.js
import request from '@/utils/request'

// const url = 'https://nmapp.singlewindow.cn'

function pubReq(data) {
  return new Promise(resolve =>{
    request(data).then(res=>{
      resolve(res)
    })
  })
}
// 查询用户列表
export function depParaList(query) {
  return pubReq({
    url:`${process.env.TEST_API}/rmftserver/sw/base/para/depParaList`,
    method: 'get',
    params: query
  })
}
