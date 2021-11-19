import axios from 'axios'
import Swal from 'sweetalert2'
const corsAnywhere = 'https://cors.bridged.cc/'

export const axiosInstance = axios.create({
  baseURL: `${corsAnywhere}https://tripday-api.herokuapp.com`,
  headers: { 'x-cors-grida-api-key': process.env.VUE_APP_CORS_KEY },
})

export const axiosInstanceJSON = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === 'production'
  //     ? `${corsAnywhere}https://tripday-json-server.vercel.app`
  //     : 'http://localhost:8000/',
  baseURL: `${corsAnywhere}https://tripday-json-server.vercel.app`,
  headers: { 'x-cors-grida-api-key': process.env.VUE_APP_CORS_KEY },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
})
