import axios from 'axios'
import store from '@/store'
import api from '@/api'

var instance = axios.create(
  {
    baseURL: api.BASE_URL
    // timeout: 60000
  }
)

// http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.getters.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 自定义请求方法

instance.auth = instance.get(api.auth).then(response => {
  if (response.data.code === 200 && response.headers.authorization) {
    store.dispatch('saveToken', { token: response.headers.authorization })
  } else {
    store.dispatch('clearToken')
  }
})

// 图片上传
instance.upload = file => {
  const axiosConfig = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `${store.getters.token}`
    }
  }
  const formdata = new window.FormData()

  if (file.length > 1) {
    for (var index in file) {
      formdata.append('file[]', file[index])
    }
  } else {
    formdata.append('file', file)
  }
  return instance.post(api.upload, formdata, axiosConfig)
}

export default instance
