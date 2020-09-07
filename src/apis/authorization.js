import { axiosInstance } from '../utils/helpers'

export default {
  singIn({ email, password }) {
    return axiosInstance.post('/signin', { email, password })
  },
  singUp({ email, password, confirmPassword }) {
    return axiosInstance.post('/signup', { email, password, confirmPassword })
  }
}