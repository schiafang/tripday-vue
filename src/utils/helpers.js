import axios from 'axios'
import Swal from 'sweetalert2'

export const axiosInstance = axios.create({
  baseURL: 'https://tripday-api.herokuapp.com'
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) { config.headers['Authorization'] = `Bearer ${token}` }
    return config
  },
  err => Promise.reject(err)
)

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
})