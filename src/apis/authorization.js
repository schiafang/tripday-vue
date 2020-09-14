import { axiosInstance } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  singIn({ email, password }) {
    return axiosInstance.post('/signin', { email, password })
  },
  singUp({ email, password, confirmPassword }) {
    return axiosInstance.post('/signup', { email, password, confirmPassword })
  },
  getCurrentUser() {
    return axiosInstance.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}