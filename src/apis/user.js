import { axiosInstance } from '../utils/helpers'

export default {
  putUser(formData) {
    console.log(formData)
    return axiosInstance.put(`/api/user`, formData)
  }
}
