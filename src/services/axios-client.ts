
import axios, { AxiosResponse } from 'axios'
import { v4 } from 'uuid'

const defaultHeader = {
  'Access-Control-Allow-Origin': '*',
  // 'Content-Type': 'application/json',
  // Accept: 'application/json',
  'X-Request-ID': v4(),
}

const baseURL: string = 'https://bff-omnistroke.yp2743.me'

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: defaultHeader,
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

//Add a response interceptor
axiosClient.interceptors.response.use(
  async (response) => {
    return handleResponse(response)
  },
  async (error) => {
    throw error
  }
)

const handleResponse = (res: AxiosResponse<any>) => {
  if (res && res.data) {
    return res.data
  }
  return res
}

export default axiosClient
