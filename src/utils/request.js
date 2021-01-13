import axios from 'axios'
import {Notification, MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {tansParams} from "@/utils/common";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时 15秒
  timeout: 25000
})

// request拦截器
service.interceptors.request.use(config => {
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    console.log("服务器返回状态码：" + JSON.stringify(res.data.code))
    console.log(res.data)
    const code = res.data.code || 200;
    const message = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 500) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    } else if (code === 240) {
      Message({
        message: message,
        type: 'warning'
      })
      return res.data
    } else if (code !== 200) {
      Notification.error({
        title: message
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    //console.log(error.response.status)
    let httpCode = error.response.status
    let message = error.message
    switch (httpCode) {
      case 400:
        message = '请求参数有误'
        break
      case 401:
        message = '权限不足或登录超时，请刷新页面'
        /*MessageBox.confirm(
          '登录超时，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })*/
        break
      case 403:
        message = '抱歉，您无权访问此资源'
        break
      case 404:
        message = '请求的资源未找到'
        break
      case 405:
        message = '不支的请求方法'
        break
      case 500:
        message = '服务器内部错误'
        break;
      default:
        break
    }

    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {
  return service.post(url, params, {
    // transformRequest: [(params) => {
    // 	return tansParams(params)
    // }],
    responseType: 'blob'
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}


export default service
