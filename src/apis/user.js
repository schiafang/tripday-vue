import { axiosInstance } from '../utils/helpers'

export default {
  putUser(formData) {
    return axiosInstance.put(`/api/user`, formData)
  }
}
