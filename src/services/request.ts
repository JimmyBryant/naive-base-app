import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量读取 API 基础路径
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送前做一些处理，例如添加 token
    const auth = localStorage.getItem('auth')
    const token = localStorage.getItem('token')
    const authValue = auth || token
    if (authValue) {
      const authorization = authValue.startsWith('Bearer ')
        ? authValue
        : `Bearer ${authValue}`
      config.headers.Authorization = authorization
    }
    
    // 显示加载条
    window.$loadingBar?.start()
    
    return config
  },
  (error) => {
    // 请求错误处理
    window.$loadingBar?.error()
    window.$message?.error('请求失败，请稍后重试')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 结束加载条
    window.$loadingBar?.finish()
    
    const { data, status } = response
    
    // 处理响应数据结构：{code, data, message} 或 {status, data, message}
    const responseCode = data.code ?? data.status
    const hasBizCode = responseCode !== undefined && responseCode !== null
    const normalizedCode =
      typeof responseCode === 'string' ? responseCode.toLowerCase() : responseCode
    const isBizSuccess =
      normalizedCode === 200 || normalizedCode === 201 || normalizedCode === 'success'
    const isHttpSuccess = status === 200
    const isSuccess = isHttpSuccess && (!hasBizCode || isBizSuccess)
    
    if (isSuccess) {
      // 返回响应体中的 data 字段，如果不存在则返回整个响应体
      return data.data ?? data
    }
    
    // 其他状态码处理
    const errorMsg = data.message || '请求异常'
    window.$message?.warning(errorMsg)
    return Promise.reject(new Error(errorMsg))
  },
  (error) => {
    // 结束加载条
    window.$loadingBar?.error()
    
    // HTTP 错误处理
    const { response } = error
    if (response) {
      switch (response.status) {
        case 401:
          window.$message?.error('未授权，请重新登录')
          // 清除 token 并跳转登录页
          localStorage.removeItem('token')
          // window.location.href = '/login'
          break
        case 403:
          window.$message?.error('拒绝访问')
          break
        case 404:
          window.$message?.error('请求的资源不存在')
          break
        case 500:
          window.$message?.error('服务器内部错误')
          break
        default:
          window.$message?.error(response.data?.message || '请求失败')
      }
    } else {
      window.$message?.error('网络连接失败，请检查网络')
    }
    
    return Promise.reject(error)
  }
)

// 封装 request 方法
export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request<T, T>(config)
}

// 便捷方法
export default {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request({ ...config, method: 'GET', url })
  },
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request({ ...config, method: 'POST', url, data })
  },
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request({ ...config, method: 'PUT', url, data })
  },
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request({ ...config, method: 'DELETE', url })
  },
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request({ ...config, method: 'PATCH', url, data })
  }
}
