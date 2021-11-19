import axios from 'axios'

const corsAnywhere = 'https://cors.bridged.cc/'

const googleInstance = axios.create({
  baseURL: corsAnywhere + 'https://maps.googleapis.com/maps/api/',
  headers: { 'x-cors-grida-api-key': process.env.VUE_APP_CORS_KEY },
})

export default {
  getPlaceID(name) {
    return googleInstance
      .get(
        `place/findplacefromtext/json?key=${process.env.VUE_APP_GOOGLEAPI}&inputtype=textquery&input=${name}`
      )
      .then((res) => res)
  },
  getPlaceDetail(placeID) {
    return googleInstance
      .get(
        `place/details/json?placeid=${placeID}&fields=name,opening_hours,rating,reviews&key=${process.env.VUE_APP_GOOGLEAPI}`
      )
      .then((res) => res)
  },
}
