import axios from 'axios'
import qs from 'querystring'
import router from '../router'
// 响应时间
axios.defaults.timeout = 30000
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
// 添加凭证
axios.defaults.withCredentials = true
// http://101.132.134.137:5888
// http://192.168.3.41:5888
axios.defaults.baseURL = 'https://mp.chikalicious.cn'

// http请求拦截器
axios.interceptors.request.use(
  config => {
    // 修改了axios的post调用方法，将post参数转化成键值对
    if (config.method === 'post' || config.method === 'put') {
      if (config.headers['Content-Type'] !== 'multipart/form-data') {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// http响应拦截器
axios.interceptors.response.use(
  response => {
    response.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (response.data.code === 2011) {
      router.replace({ 'name': 'Login' })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  })

export default axios
