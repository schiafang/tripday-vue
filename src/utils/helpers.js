import axios from 'axios'
import Swal from 'sweetalert2'

export const axiosInstance = axios.create({
  baseURL: 'https://tripday-api.herokuapp.com'
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
})