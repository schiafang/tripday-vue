import { axiosInstance } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  singIn({ email, password }) {
    return axiosInstance.post('/api/signin', { email, password })
  },
  singUp({ email, password, confirmPassword }) {
    return axiosInstance.post('/api/signup', { email, password, confirmPassword })
  },
  getCurrentUser() {
    return axiosInstance.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}