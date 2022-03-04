import axios from 'axios'
const getToken = false

// Default config for the axios instance
const axiosParams = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://api.covid19api.com' : '/'
}

// Create axios instance with default params
const request = axios.create(axiosParams)

const withTokenInterceptor = config => {
  if (getToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}

request.interceptors.request.use(withTokenInterceptor, error => Promise.reject(error))

request.interceptors.response.use(
  function (res) {
    if (res.request.responseType === 'blob') {
      return res
    }
    return res.data
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default request
