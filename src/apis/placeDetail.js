import axios from 'axios'
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'

export default {
  getPlaceID(name) {
    return axios.get(`${corsAnywhere}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.VUE_APP_GOOGLEAPI}&inputtype=textquery&input=${name}`).then(res => {
      return res
    })
  },
  getPlaceDetail(placeID) {
    return axios.get(`${corsAnywhere}https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&fields=name,opening_hours,rating,reviews&key=${process.env.VUE_APP_GOOGLEAPI}`).then(res => {
      return res
    })
  }
}