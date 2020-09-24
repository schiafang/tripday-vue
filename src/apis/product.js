import { axiosInstanceJSON } from '../utils/helpers'

export default {
  getTopProducts() {
    return axiosInstanceJSON.get('/topProducts')
  },
  getProduct(id) {
    return axiosInstanceJSON.get(`/products/${id}`)
  },
  getCities() {
    return axiosInstanceJSON.get('/cities')
  },
  getCityProducts(city) {
    return axiosInstanceJSON.get(`/products?city=${city}`)
  }
}